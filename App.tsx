// src/App.tsx
import React from "react";
import { GameProvider } from "./engine/GameContext";
import { SceneRouter } from "./scenes/SceneRouter";

const App: React.FC = () => {
  return (
    <GameProvider>
      <SceneRouter />
    </GameProvider>
  );
};

export default App;
