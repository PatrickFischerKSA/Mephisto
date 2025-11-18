// src/scenes/NicolettaMarderScene.tsx
import React from "react";
import { StatsDisplay } from "../components/StatsDisplay";
import { ChoiceButton } from "../components/ChoiceButton";
import { useGame } from "../engine/GameContext";

export const NicolettaMarderScene: React.FC = () => {
  const { updateStats, updateRelationship, setFlag, changeScene } = useGame();

  const handleDiskussion = () => {
    updateStats({ gewissen: +5, schuld: -5 });
    updateRelationship("theophilMarder", +10);
    updateRelationship("nicolettaVonNiebuhr", +5);
    changeScene("lotte");
  };

  const handleZynischMitNicoletta = () => {
    updateStats({ karriere: +10, schuld: +10 });
    updateRelationship("nicolettaVonNiebuhr", +20);
    updateRelationship("theophilMarder", -10);
    setFlag("nicolettaAffaere", true);
    setFlag("nicolettaMitMarderKonflikt", true);
    changeScene("lotte");
  };

  const handleMarderAbkanzeln = () => {
    updateStats({ oeffentlicheMeinung: +5, schuld: +5 });
    updateRelationship("theophilMarder", -20);
    changeScene("lotte");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-900 p-6 md:p-10 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <StatsDisplay />

        <div className="bg-slate-800 p-8 rounded-lg mb-6 border border-purple-500 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-amber-400">
            Salon bei Nicoletta von Niebuhr
          </h2>
          <p className="mb-4 text-sm text-gray-300">
            Später Abend, ein überheizter Salon, Rauch, Champagner, Gedränge.
            Nicoletta halb auf einem Sofa, Theophil Marder im Sessel, Glas in
            der Hand. Du kommst direkt von der Premiere.
          </p>
          <div className="space-y-2 text-base leading-relaxed">
            <p>
              <span className="text-pink-300 font-semibold">Nicoletta:</span>{" "}
              „Da ist er ja, der Mann des Abends. Komm, setz dich. Theophil und
              ich haben gerade darüber gestritten, ob Genie Feigheit
              entschuldigt.“
            </p>
            <p>
              <span className="text-emerald-300 font-semibold">Marder:</span>{" "}
              „Ich habe behauptet: nein.“
            </p>
            <p>
              <span className="text-amber-300 font-semibold">Hendrik:</span>{" "}
              „Dann bin ich ja in bester Gesellschaft. Zwei Experten.“
            </p>
            <p>
              <span className="text-pink-300 font-semibold">Nicoletta:</span>{" "}
              „Theophil meint, man dürfe mit Mördern nicht spielen. Ich meine,
              man darf mit allem spielen – wenn man gut genug ist.“
            </p>
            <p>
              <span className="text-emerald-300 font-semibold">Marder:</span>{" "}
              „Das Problem ist, Hendrik, dass du nicht nur spielst. Du
              legitimierst.“
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <ChoiceButton
            variant="primary"
            title="„Vielleicht sind wir alle schon zu tief drin…“"
            description="Du suchst das Gespräch und versuchst, die Lage ehrlich zu analysieren – ohne dich herauszureden."
            statsHint="+5 Gewissen | −5 Schuld | Marder + | Nicoletta leicht +"
            onClick={handleDiskussion}
          />
          <ChoiceButton
            variant="danger"
            title="„Ich kann mit allem spielen – selbst mit Schuld.“"
            description="Du flirtest mit Nicoletta, machst aus Moral ein Spiel und hoffst auf Glanz statt Wahrheit."
            statsHint="+10 Karriere | +10 Schuld | Nicoletta ++ | Marder −"
            onClick={handleZynischMitNicoletta}
          />
          <ChoiceButton
            variant="secondary"
            title="„Du bist sehr mutig, Theophil – hier im warmen Salon.“"
            description="Du kanzelst Marder vor Publikum ab und stellst ihn als feigen Nörgler hin."
            statsHint="+5 Öffentliche Meinung | +5 Schuld | Marder −−"
            onClick={handleMarderAbkanzeln}
          />
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-600 space-y-3 text-sm text-gray-300">
          <p>
            Nicoletta lacht leise, Marder kneift die Augen zusammen. Der Abend
            kippt – du spürst, dass du hier Verbündete und Feinde zugleich
            machst.
          </p>
          <p className="italic text-gray-400">
            Egal, wie du dich entscheidest: Nicoletta wird über dich sprechen.
            Und Marder wird sich daran erinnern.
          </p>
        </div>
      </div>
    </div>
  );
};
