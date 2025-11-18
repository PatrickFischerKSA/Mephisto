// src/components/StatsDisplay.tsx
import React from "react";
import { useGame } from "../engine/GameContext";
import {
  Crown,
  Heart,
  Star,
  AlertTriangle,
  TrendingUp,
  Skull,
} from "lucide-react";

interface StatBarProps {
  icon: React.ElementType;
  label: string;
  value: number;
}

const StatBar: React.FC<StatBarProps> = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-slate-900 p-3 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-gray-400" />
          <span className="text-xs text-gray-400 font-bold">{label}</span>
        </div>
        <span className="text-sm font-bold text-white">{value}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className="bg-amber-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export const StatsDisplay: React.FC = () => {
  const { stats, relationships } = useGame();

  const relArray = Object.entries(relationships).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="bg-slate-800 p-4 rounded-lg mb-6 shadow-xl border border-slate-700">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <StatBar icon={Crown} label="Karriere" value={stats.karriere} />
        <StatBar icon={Heart} label="Gewissen" value={stats.gewissen} />
        <StatBar icon={Star} label="Ruhm" value={stats.ruhm} />
        <StatBar
          icon={TrendingUp}
          label="Min.-Präs."
          value={stats.ministerpraesidentGunst}
        />
        <StatBar
          icon={Skull}
          label="Propagandamin."
          value={stats.propagandaministerGunst}
        />
        <StatBar icon={AlertTriangle} label="Gefahr" value={stats.gefahr} />
      </div>

      <div className="text-xs text-gray-400 mb-2 font-bold">Beziehungen:</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {relArray.slice(0, 8).map(([key, value]) => {
          const name = key.replace(/([A-Z])/g, " $1").trim();
          const color =
            value >= 70
              ? "text-green-400"
              : value >= 40
              ? "text-yellow-400"
              : "text-red-400";
          return (
            <div key={key} className={`${color} font-mono`}>
              {name}: {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};
