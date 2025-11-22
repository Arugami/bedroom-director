
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Loader2 } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: Date;
}

interface DirectorChatProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    isGenerating: boolean;
}

export default function DirectorChat({ messages, onSendMessage, isGenerating }: DirectorChatProps) {
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isGenerating) return;
        onSendMessage(input);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full bg-black/20">
            {/* Chat Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-bedroom-purple animate-pulse" />
                <span className="text-xs font-bold text-screen-white tracking-wider uppercase">Director Chat</span>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40 p-8">
                        <Sparkles className="w-8 h-8 mb-4 text-bedroom-purple" />
                        <p className="text-sm font-medium text-screen-white">Ready to brainstorm?</p>
                        <p className="text-xs text-screen-white/60 mt-2">Ask me to generate scenes, suggest shots, or refine your vision.</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap - 3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} `}
                        >
                            <div className={`
flex - none w - 8 h - 8 rounded - full flex items - center justify - center
                ${msg.role === 'user' ? 'bg-white/10' : 'bg-bedroom-purple/20 text-bedroom-purple'}
`}>
                                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>

                            <div className={`
max - w - [80 %] rounded - 2xl px - 4 py - 3 text - sm leading - relaxed
                ${msg.role === 'user'
                                    ? 'bg-white/10 text-screen-white rounded-tr-none'
                                    : 'bg-bedroom-purple/10 text-screen-white/90 border border-bedroom-purple/20 rounded-tl-none'
                                }
`}>
                                {msg.content}
                            </div>
                        </div>
                    ))
                )}

                {isGenerating && (
                    <div className="flex gap-3">
                        <div className="flex-none w-8 h-8 rounded-full bg-bedroom-purple/20 text-bedroom-purple flex items-center justify-center">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-bedroom-purple/10 border border-bedroom-purple/20 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-spin text-bedroom-purple" />
                            <span className="text-xs text-bedroom-purple font-medium">Thinking...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-black/40 backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe a scene or ask for ideas..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-screen-white placeholder-white/20 focus:outline-none focus:border-bedroom-purple/50 focus:bg-white/10 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isGenerating}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-bedroom-purple text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bedroom-purple/80 transition-colors"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
