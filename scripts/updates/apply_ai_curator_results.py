#!/usr/bin/env python3
"""
Apply AI Curator Results to the Model Catalog

This script takes curated candidate models/tools (produced by an external
AI "curator" service) and merges them into `data/ai_video_image_models.csv`.

The curator is expected to emit JSON objects matching the schema sketched in
`docs/strategy/ai-model-strategy-and-training-roadmap.md` (section 12.2),
one JSON object per line (NDJSON) in:

    data/ai_curator/curated_candidates.jsonl

For each candidate with `decision.action` in {"accept", "experimental"} and
`dedupe.status == "distinct"`, we either:
  - Append a new CSV row (new tool/model), or
  - Update an existing row that matches on (Vendor, Model).

This script does **not** talk to any LLMs itself – it is the "apply" step
after an AI curator has already normalized, de-duplicated, and scored fit.

Usage (from repo root):

    python scripts/updates/apply_ai_curator_results.py \
        --input data/ai_curator/curated_candidates.jsonl

It will:
  - Create a timestamped backup in `data/backups/`.
  - Update `data/ai_video_image_models.csv`.
  - Optionally (default) re-run `scripts/utilities/sync_to_json.py` so
    `data/models.json` stays in sync.
"""

import argparse
import csv
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple


BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"
CSV_PATH = DATA_DIR / "ai_video_image_models.csv"
BACKUP_DIR = DATA_DIR / "backups"
CURATOR_DEFAULT_PATH = DATA_DIR / "ai_curator" / "curated_candidates.jsonl"
SYNC_SCRIPT = BASE_DIR / "scripts" / "utilities" / "sync_to_json.py"


CsvRow = List[str]
CsvHeader = List[str]


def load_curated_candidates(path: Path) -> List[Dict]:
    """Load NDJSON file of curated candidates."""
    if not path.exists():
        raise FileNotFoundError(f"Curated candidates file not found: {path}")

    candidates: List[Dict] = []
    with path.open("r", encoding="utf-8") as f:
        for line_no, line in enumerate(f, start=1):
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
                candidates.append(obj)
            except json.JSONDecodeError as exc:
                raise ValueError(f"Invalid JSON on line {line_no} of {path}: {exc}") from exc

    return candidates


def backup_csv(csv_path: Path, backup_dir: Path) -> Path:
    """Create a timestamped backup of the CSV file."""
    backup_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = backup_dir / f"ai_video_image_models_BACKUP_{timestamp}.csv"
    backup_path.write_bytes(csv_path.read_bytes())
    return backup_path


def read_csv(csv_path: Path) -> Tuple[CsvHeader, List[CsvRow]]:
    """Read CSV header and rows."""
    with csv_path.open("r", encoding="utf-8", newline="") as f:
        reader = csv.reader(f)
        header = next(reader)
        rows = list(reader)
    return header, rows


def write_csv(csv_path: Path, header: CsvHeader, rows: List[CsvRow]) -> None:
    """Write header and rows back to CSV."""
    with csv_path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(rows)


def index_existing_rows(header: CsvHeader, rows: List[CsvRow]) -> Dict[Tuple[str, str], int]:
    """
    Build an index of existing rows keyed by (Vendor, Model), case-insensitive.
    """
    try:
        vendor_idx = header.index("Vendor")
        model_idx = header.index("Model")
    except ValueError as exc:
        raise RuntimeError("CSV is missing required columns 'Vendor' or 'Model'") from exc

    index: Dict[Tuple[str, str], int] = {}
    for i, row in enumerate(rows):
        if len(row) <= max(vendor_idx, model_idx):
            continue
        key = (row[vendor_idx].strip().lower(), row[model_idx].strip().lower())
        index[key] = i
    return index


def candidate_to_csv_row(header: CsvHeader, candidate: Dict) -> CsvRow:
    """
    Map a curated candidate's `normalized` + `fit` metadata into our CSV schema.

    We keep this intentionally conservative:
      - Only fill fields we have reasonably good data for.
      - Leave the rest empty so humans can refine over time.
    """
    normalized = candidate.get("normalized", {})
    fit = candidate.get("fit", {}) or {}

    vendor = normalized.get("vendor", "").strip()
    name = normalized.get("name", "").strip()
    primary_category = normalized.get("category", "").strip()
    modality = normalized.get("modality", "").strip()
    best_for = normalized.get("best_for", "").strip()
    limitations = normalized.get("limitations", "").strip()
    short_description = normalized.get("short_description", "").strip()
    notable_sources = normalized.get("notable_sources") or []
    pricing = normalized.get("pricing") or {}

    pricing_str_parts: List[str] = []
    approx_usd = pricing.get("approx_usd")
    unit = pricing.get("unit")
    if approx_usd is not None:
        pricing_str_parts.append(f"~${approx_usd} {unit or ''}".strip())
    if pricing.get("note"):
        pricing_str_parts.append(str(pricing["note"]))
    pricing_str = "; ".join(pricing_str_parts)

    distinctive_edge = fit.get("reason", "").strip()

    # Build a row aligned with the current CSV header.
    row: CsvRow = []
    for col in header:
        if col == "Vendor":
            row.append(vendor)
        elif col == "Primary_Category":
            # Fall back to fit.recommended_bd_category if primary category missing
            row.append(primary_category or fit.get("recommended_bd_category", ""))
        elif col == "Model_Type":
            row.append(normalized.get("model_type", "Native Model"))
        elif col == "License_Type":
            row.append(normalized.get("license_type", ""))
        elif col == "Special_Flags":
            row.append(normalized.get("special_flags", ""))
        elif col == "Skill_Level":
            row.append(normalized.get("skill_level", "Intermediate"))
        elif col == "Best_For":
            row.append(best_for)
        elif col == "Model":
            row.append(name)
        elif col == "Modality":
            row.append(modality)
        elif col == "Key Features":
            row.append(short_description or normalized.get("key_features", ""))
        elif col == "Duration/Resolution":
            row.append(normalized.get("duration_resolution", ""))
        elif col == "Controls":
            row.append(normalized.get("controls", ""))
        elif col == "Speed":
            row.append(normalized.get("speed", ""))
        elif col == "Pricing":
            row.append(pricing_str)
        elif col == "License":
            row.append(normalized.get("license", ""))
        elif col == "Update Cadence":
            row.append(normalized.get("update_cadence", "Active (auto-curated)"))
        elif col == "Distinctive Edge":
            row.append(distinctive_edge or normalized.get("distinctive_edge", ""))
        elif col == "Pro Tips":
            row.append(normalized.get("pro_tips", ""))
        elif col == "Drawbacks":
            row.append(limitations)
        elif col == "Notable Sources":
            row.append("; ".join(notable_sources))
        elif col == "thumbnail_url":
            row.append(normalized.get("thumbnail_url", ""))
        else:
            # Unknown future column – keep it empty so we don't guess.
            row.append("")

    return row


def apply_curated_candidates(
    header: CsvHeader,
    rows: List[CsvRow],
    candidates: List[Dict],
) -> Tuple[List[CsvRow], Dict[str, int]]:
    """
    Merge curated candidates into CSV rows.

    Returns updated rows and a small summary dict with counts.
    """
    index = index_existing_rows(header, rows)
    summary = {
        "accepted_new": 0,
        "accepted_updated": 0,
        "experimental_new": 0,
        "experimental_updated": 0,
        "skipped_duplicates": 0,
        "skipped_rejected": 0,
    }

    for candidate in candidates:
        decision = (candidate.get("decision") or {}).get("action", "").lower()
        dedupe = candidate.get("dedupe") or {}
        dedupe_status = (dedupe.get("status") or "").lower()

        if decision not in {"accept", "experimental"}:
            summary["skipped_rejected"] += 1
            continue

        if dedupe_status in {"duplicate", "platform_wrapper"}:
            summary["skipped_duplicates"] += 1
            continue

        normalized = candidate.get("normalized") or {}
        vendor = normalized.get("vendor", "").strip()
        name = normalized.get("name", "").strip()
        key = (vendor.lower(), name.lower())

        new_row = candidate_to_csv_row(header, candidate)

        if key in index:
            # Update existing row in-place
            row_idx = index[key]
            rows[row_idx] = new_row
            if decision == "accept":
                summary["accepted_updated"] += 1
            else:
                summary["experimental_updated"] += 1
        else:
            # Append new row
            rows.append(new_row)
            new_index = len(rows) - 1
            index[key] = new_index
            if decision == "accept":
                summary["accepted_new"] += 1
            else:
                summary["experimental_new"] += 1

    return rows, summary


def maybe_run_sync(sync: bool) -> None:
    """Optionally re-run sync_to_json so models.json stays in sync."""
    if not sync:
        return

    if not SYNC_SCRIPT.exists():
        print(f"⚠️ sync_to_json.py not found at {SYNC_SCRIPT}, skipping JSON sync.")
        return

    # Import and invoke csv_to_json directly instead of spawning a subprocess.
    import runpy

    print("🔄 Running sync_to_json.py to refresh data/models.json …")
    runpy.run_path(str(SYNC_SCRIPT), run_name="__main__")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Apply AI curator results to ai_video_image_models.csv"
    )
    parser.add_argument(
        "--input",
        type=Path,
        default=CURATOR_DEFAULT_PATH,
        help=f"Path to curated candidates NDJSON (default: {CURATOR_DEFAULT_PATH})",
    )
    parser.add_argument(
        "--no-sync",
        action="store_true",
        help="Do not run sync_to_json.py after updating the CSV",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    curated_path: Path = args.input

    print("🤖 Applying AI curator results")
    print(f"📄 Curated candidates: {curated_path}")
    print(f"📊 Catalog CSV:        {CSV_PATH}")

    candidates = load_curated_candidates(curated_path)
    if not candidates:
        print("⚠️ No curated candidates found – nothing to apply.")
        return

    backup_path = backup_csv(CSV_PATH, BACKUP_DIR)
    print(f"📦 Backup created at {backup_path}")

    header, rows = read_csv(CSV_PATH)
    rows, summary = apply_curated_candidates(header, rows, candidates)
    write_csv(CSV_PATH, header, rows)

    print("\n✅ Catalog updated.")
    print(
        f"   Accepted: {summary['accepted_new']} new, "
        f"{summary['accepted_updated']} updated"
    )
    print(
        f"   Experimental: {summary['experimental_new']} new, "
        f"{summary['experimental_updated']} updated"
    )
    print(
        f"   Skipped: {summary['skipped_duplicates']} duplicates, "
        f"{summary['skipped_rejected']} rejected"
    )

    maybe_run_sync(sync=not args.no_sync)


if __name__ == "__main__":
    main()

