import { cn } from "@/lib/utils";

interface LogoProps {
    collapsed?: boolean;
    className?: string;
}

export default function Logo({ collapsed = false, className }: LogoProps) {
    return (
        <div className={cn("flex items-center gap-3 group select-none", className)}>
            {/* Icon Mark */}
            <div className={cn(
                "relative flex items-center justify-center rounded-xl transition-all duration-300",
                collapsed ? "w-10 h-10" : "w-9 h-9 md:w-10 md:h-10",
                "bg-gradient-to-br from-bedroom-purple/20 to-indigo-500/20",
                "border border-bedroom-purple/30 group-hover:border-bedroom-purple/50",
                "shadow-[0_0_15px_rgba(124,58,237,0.15)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]",
                "group-hover:scale-105"
            )}>
                {/* Inner Glow with pulse */}
                <div className="absolute inset-0 rounded-xl bg-bedroom-purple/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

                {/* Monogram */}
                <span className={cn(
                    "relative z-10 font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70",
                    collapsed ? "text-xs" : "text-[10px] md:text-[11px]"
                )}>
                    BD
                </span>
            </div>

            {/* Text Lockup */}
            {!collapsed && (
                <div className="flex flex-col leading-none">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-white/90 group-hover:text-white transition-colors">
                            BEDROOM
                        </span>
                    </div>
                    <div className="flex items-center justify-between w-full mt-0.5">
                        <span className="text-[11px] md:text-xs font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-bedroom-purple to-indigo-400 group-hover:from-bedroom-purple/80 group-hover:to-indigo-300 transition-all">
                            DIRECTOR
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
