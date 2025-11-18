// src/scenes/MiklasScene.tsx
import React from "react";
import { StatsDisplay } from "../components/StatsDisplay";
import { ChoiceButton } from "../components/ChoiceButton";
import { useGame } from "../engine/GameContext";

export const MiklasScene: React.FC = () => {
  const { updateStats, updateRelationship, setFlag, changeScene } = useGame();

  const handleZuhoeren = () => {
    updateStats({ schuld: +5, gefahr: -5 });
    updateRelationship("hansMiklas", +15);
    setFlag("miklasFeind", false);
    setFlag("miklasWarnungErhalten", true);
    changeScene("doraBrief");
  };

  const handleAbwimmeln = () => {
    updateStats({ gefahr: +10 });
    updateRelationship("hansMiklas", -15);
    setFlag("miklasFeind", true);
    changeScene("doraBrief");
  };

  const handleAggressiv = () => {
    updateStats({ gefahr: +15, schuld: +5 });
    updateRelationship("hansMiklas", -25);
    setFlag("miklasFeind", true);
    changeScene("doraBrief");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-orange-900 p-6 md:p-10 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <StatsDisplay />

        <div className="bg-slate-800 p-8 rounded-lg mb-6 border border-orange-500 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-amber-400">
            Hinterhof – Hans Miklas
          </h2>
          <p className="mb-4 text-sm text-gray-300">
            Nacht, der Hinterhof hinter dem Theater ist fast dunkel. Du
            öffnest die Hintertür – eine Gestalt tritt aus dem Schatten. SA-
            Uniform, der Stoff abgetragen. Hans Miklas.
          </p>
          <div className="space-y-2 text-base leading-relaxed">
            <p>
              <span className="text-yellow-300 font-semibold">Miklas:</span>{" "}
              „Herr Intendant. Ich muss… mit Ihnen reden.“
            </p>
            <p>
              <span className="text-amber-300 font-semibold">Hendrik:</span>{" "}
              „Es ist spät, Miklas. Morgen haben wir die Generalprobe.“
            </p>
            <p>
              <span className="text-yellow-300 font-semibold">Miklas:</span>{" "}
              „Generalprobe, ha. Wir haben Generalproben auf der Straße
              gemacht, bevor ihr feinen Herren überhaupt wusstet, wie man den
              Arm richtig hebt.“
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <ChoiceButton
            variant="primary"
            title="„Was ist los? Du siehst mitgenommen aus.“"
            description="Du nimmst Miklas ernst und hörst ihm zu."
            statsHint="+5 Schuld | −5 Gefahr | Miklas + | Warnung-Flag"
            onClick={handleZuhoeren}
          />
          <ChoiceButton
            variant="secondary"
            title="„Das ist jetzt nicht der Moment – sprich mit deinem Truppführer.“"
            description="Du wimmelst ihn ab, als wäre er nur ein lästiges Problem in Uniform."
            statsHint="+10 Gefahr | Miklas −"
            onClick={handleAbwimmeln}
          />
          <ChoiceButton
            variant="danger"
            title="„Du tust hier, was man dir sagt. Nicht mehr.“"
            description="Du setzt dich autoritär über Miklas hinweg und machst klar, wer hier oben und wer unten ist."
            statsHint="+15 Gefahr | +5 Schuld | Miklas −−"
            onClick={handleAggressiv}
          />
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-600 text-sm text-gray-300 space-y-3">
          <p>
            Miklas tritt näher, sein Atem riecht nach Bier und Wut. In seinen
            Augen liegt etwas Unruhiges, Gefährliches – die Mischung aus
            Loyalität und Enttäuschung, die leicht umkippt.
          </p>
          <p className="italic text-gray-400">
            Ganz gleich, wie du reagierst: Hans Miklas wird sich erinnern. Und
            wenn er fällt, wird er jemanden mitreißen wollen.
          </p>
        </div>
      </div>
    </div>
  );
};
