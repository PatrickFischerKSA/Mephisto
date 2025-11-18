// src/components/ChoiceButton.tsx
import React from "react";

type Variant = "primary" | "secondary" | "danger" | "success";

interface ChoiceButtonProps {
  variant?: Variant;
  title: string;
  description: string;
  statsHint?: string;
  onClick: () => void;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 border-amber-500",
  secondary:
    "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 border-slate-500",
  danger:
    "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-red-500",
  success:
    "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-green-500",
};

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  variant = "primary",
  title,
  description,
  statsHint,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} w-full text-left p-5 rounded-lg border-2 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="text-xl font-bold mb-2 text-white">{title}</div>
      <div className="text-sm text-gray-100 mb-3 leading-relaxed">
        {description}
      </div>
      {statsHint && (
        <div className="text-xs text-gray-300 italic border-t border-white/20 pt-2">
          📊 {statsHint}
        </div>
      )}
    </button>
  );
};
