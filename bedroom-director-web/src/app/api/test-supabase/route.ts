import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    if (!supabase) {
        return NextResponse.json({ error: "Supabase client not initialized" }, { status: 500 });
    }

    try {
        const { data: buckets, error } = await supabase.storage.listBuckets();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const visualBibleBucket = buckets.find(b => b.name === 'visual-bible');

        return NextResponse.json({
            success: true,
            buckets: buckets.map(b => b.name),
            visualBibleBucketExists: !!visualBibleBucket,
            env: {
                url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
                key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
        });
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
