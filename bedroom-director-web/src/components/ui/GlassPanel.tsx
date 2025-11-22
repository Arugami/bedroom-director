import React from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: React.ElementType;
    onClose?: () => void;
}

export const GlassPanel = ({ children, className, title, icon: Icon, onClose, ...props }: GlassPanelProps) => {
    return (
        <div
            className={cn(
                "bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300",
                className
            )}
            {...props}
        >
            {(title || Icon || onClose) && (
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                    <div className="flex items-center gap-2 text-white/80">
                        {Icon && <Icon className="w-4 h-4" />}
                        {title && <span className="text-xs font-medium uppercase tracking-wider">{title}</span>}
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                            <span className="sr-only">Close</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
            <div className="p-4">
                {children}
            </div>
        </div>
    );
};
