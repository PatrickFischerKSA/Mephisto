// src/engine/GameContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export type SceneId =
  | "barbara"
  | "juliette"
  | "nicolettaMarder"
  | "lotte"
  | "miklas"
  | "doraBrief";

export interface Stats {
  karriere: number;
  gewissen: number;
  schuld: number;
  ruhm: number;
  gefahr: number;
  ministerpraesidentGunst: number;
  propagandaministerGunst: number;
  oeffentlicheMeinung: number;
  innereLeere: number;
}

export interface Relationships {
  barbaraBruckner: number;
  ottoUlrichs: number;
  julietteMartens: number;
  nicolettaVonNiebuhr: number;
  lotteLindenthal: number;
  hansMiklas: number;
  theophilMarder: number;
  doraMartin: number;
  caesarVonMuck: number;
  propagandaminister: number;
}

export interface Flags {
  barbaraKontaktAufgenommen: boolean;
  barbaraHilfsangebot: boolean;
  barbaraVerraeten: boolean;

  julietteNochInDeutschland: boolean;
  julietteBeziehungAktiv: boolean;
  julietteAusgewiesen: boolean;
  exilOptionAktiv: boolean;

  nicolettaAffaere: boolean;
  nicolettaMitMarderKonflikt: boolean;

  lotteProtektion: boolean;
  lotteEifersuechtig: boolean;

  miklasFeind: boolean;
  miklasVerraeten: boolean;
  miklasWarnungErhalten: boolean;

  doraBriefErhalten: boolean;
  doraBriefGelesen: boolean;
  doraAntwortGesendet: boolean;
}

export interface GameContextValue {
  scene: SceneId;
  stats: Stats;
  relationships: Relationships;
  flags: Flags;

  changeScene: (scene: SceneId) => void;
  updateStats: (delta: Partial<Stats>) => void;
  updateRelationship: (key: keyof Relationships, change: number) => void;
  setFlag: (key: keyof Flags, value: boolean) => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

const clamp = (value: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, value));

const initialStats: Stats = {
  karriere: 20,
  gewissen: 70,
  schuld: 10,
  ruhm: 20,
  gefahr: 10,
  ministerpraesidentGunst: 0,
  propagandaministerGunst: 0,
  oeffentlicheMeinung: 20,
  innereLeere: 10,
};

const initialRelationships: Relationships = {
  barbaraBruckner: 40,
  ottoUlrichs: 50,
  julietteMartens: 60,
  nicolettaVonNiebuhr: 30,
  lotteLindenthal: 10,
  hansMiklas: 50,
  theophilMarder: 40,
  doraMartin: 50,
  caesarVonMuck: 20,
  propagandaminister: 10,
};

const initialFlags: Flags = {
  barbaraKontaktAufgenommen: false,
  barbaraHilfsangebot: false,
  barbaraVerraeten: false,

  julietteNochInDeutschland: true,
  julietteBeziehungAktiv: true,
  julietteAusgewiesen: false,
  exilOptionAktiv: false,

  nicolettaAffaere: false,
  nicolettaMitMarderKonflikt: false,

  lotteProtektion: false,
  lotteEifersuechtig: false,

  miklasFeind: false,
  miklasVerraeten: false,
  miklasWarnungErhalten: false,

  doraBriefErhalten: true, // für Demo direkt auf true
  doraBriefGelesen: false,
  doraAntwortGesendet: false,
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [scene, setScene] = useState<SceneId>("barbara");
  const [stats, setStats] = useState<Stats>(initialStats);
  const [relationships, setRelationships] =
    useState<Relationships>(initialRelationships);
  const [flags, setFlags] = useState<Flags>(initialFlags);

  const changeScene = (newScene: SceneId) => {
    setScene(newScene);
    window.scrollTo(0, 0);
  };

  const updateStats = (delta: Partial<Stats>) => {
    setStats((prev) => {
      const next: Stats = { ...prev };
      (Object.keys(delta) as (keyof Stats)[]).forEach((key) => {
        const change = delta[key];
        if (typeof change === "number") {
          next[key] = clamp(prev[key] + change);
        }
      });
      return next;
    });
  };

  const updateRelationship = (key: keyof Relationships, change: number) => {
    setRelationships((prev) => ({
      ...prev,
      [key]: clamp(prev[key] + change),
    }));
  };

  const setFlag = (key: keyof Flags, value: boolean) => {
    setFlags((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const value: GameContextValue = {
    scene,
    stats,
    relationships,
    flags,
    changeScene,
    updateStats,
    updateRelationship,
    setFlag,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextValue => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return ctx;
};
