import { getTools } from "@/lib/data/tools";
import ToolsClient from "@/components/tools/ToolsClient";

export default function ToolsPage() {
  const tools = getTools();

  return <ToolsClient tools={tools} />;
}
