"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Copy, ExternalLink, X } from "lucide-react";

export interface ToastProps {
  message: string;
  type?: "success" | "info" | "error";
  duration?: number;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export function Toast({ message, type = "success", duration = 3000, icon, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: "bg-green-500/90",
    info: "bg-bedroom-purple/90",
    error: "bg-red-500/90",
  }[type];

  const defaultIcon = {
    success: <CheckCircle className="w-5 h-5" />,
    info: <Copy className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
  }[type];

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 ${bgColor} backdrop-blur-sm rounded-lg shadow-2xl text-white font-medium transition-all duration-300 ${
        isExiting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      }`}
    >
      {icon || defaultIcon}
      <span>{message}</span>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
            onClose?.();
          }, 300);
        }}
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Toast Manager Hook
export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const showToast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...props, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, showToast, removeToast };
}
