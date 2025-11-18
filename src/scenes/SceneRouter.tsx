// src/scenes/SceneRouter.tsx
import React from "react";
import { useGame } from "../engine/GameContext";
import { BarbaraScene } from "./BarbaraScene";
import { JulietteScene } from "./JulietteScene";
import { NicolettaMarderScene } from "./NicolettaMarderScene";
import { LotteScene } from "./LotteScene";
import { MiklasScene } from "./MiklasScene";
import { DoraBriefScene } from "./DoraBriefScene";

export const SceneRouter: React.FC = () => {
  const { scene } = useGame();

  switch (scene) {
    case "barbara":
      return <BarbaraScene />;
    case "juliette":
      return <JulietteScene />;
    case "nicolettaMarder":
      return <NicolettaMarderScene />;
    case "lotte":
      return <LotteScene />;
    case "miklas":
      return <MiklasScene />;
    case "doraBrief":
      return <DoraBriefScene />;
    default:
      return <BarbaraScene />;
  }
};
