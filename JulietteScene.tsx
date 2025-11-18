// src/scenes/JulietteScene.tsx
import React, { useState } from "react";
import { StatsDisplay } from "../components/StatsDisplay";
import { ChoiceButton } from "../components/ChoiceButton";
import { useGame } from "../engine/GameContext";

export const JulietteScene: React.FC = () => {
  const {
    stats,
    flags,
    updateStats,
    updateRelationship,
    setFlag,
    changeScene,
  } = useGame();
  const [answer, setAnswer] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const handleOffenAufSeite = () => {
    updateStats({
      gewissen: +15,
      gefahr: +20,
      oeffentlicheMeinung: -10,
    });
    updateRelationship("julietteMartens", +15);
    setFlag("julietteBeziehungAktiv", true);
  };

  const handleKleinreden = () => {
    updateStats({ innereLeere: +10, schuld: +5 });
    updateRelationship("julietteMartens", -10);
  };

  const handleDistanzieren = () => {
    updateStats({ karriere: +10, schuld: +15, innereLeere: +10 });
    updateRelationship("julietteMartens", -25);
    setFlag("julietteBeziehungAktiv", false);
  };

  const evaluateFreeText = () => {
    const text = answer.toLowerCase();
    let deltaGewissen = 0;
    let deltaSchuld = 0;
    let exil = false;

    if (text.includes("mit dir gehen") || text.includes("fliehen")) {
      deltaGewissen += 10;
      exil = true;
    }
    if (text.includes("angst") || text.includes("feige")) {
      deltaGewissen += 5;
    }
    if (text.includes("karriere") || text.includes("star") || text.includes("intendant")) {
      deltaSchuld += 10;
    }
    if (text.includes("egal") || text.includes("ist mir egal")) {
      deltaSchuld += 15;
    }

    updateStats({
      gewissen: deltaGewissen,
      schuld: deltaSchuld,
    });

    if (exil) {
      setFlag("exilOptionAktiv", true);
    }

    setEvaluated(true);
    // zur nächsten Szene weiter
    changeScene("nicolettaMarder");
  };

  const canEvaluate = answer.trim().length > 5 && !evaluated;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-blue-900 p-6 md:p-10 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <StatsDisplay />

        <div className="bg-slate-800 p-8 rounded-lg mb-6 border border-blue-500 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-amber-400">
            Juliette muss gehen
          </h2>
          <p className="mb-4 text-sm text-gray-300">
            Berlin, frühe 30er Jahre. Die Wohnung ist voller Kisten. Juliette
            kniet über einem Koffer, ihre bunten Stoffe, Fotos und Noten liegen
            verstreut.
          </p>
          <div className="space-y-2 text-base leading-relaxed">
            <p>
              <span className="text-indigo-300 font-semibold">Juliette:</span>{" "}
              „Sie nennen mich ‚dunkle Deutsche‘, weißt du das? Erst Exotik, dann
              Gefahr. Jetzt Problem.“
            </p>
            <p>
              <span className="text-amber-300 font-semibold">Hendrik:</span>{" "}
              „Es ist… eine schwierige Zeit. Vielleicht wird es wieder…“
            </p>
            <p>
              <span className="text-indigo-300 font-semibold">Juliette:</span>{" "}
              „Du spielst wirklich gut, mein Schauspieler. Sogar außerhalb der
              Bühne.“
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <ChoiceButton
            variant="success"
            title="„Ich will nicht, dass du gehst.“"
            description="Du stellst dich offen auf Juliettes Seite, trotz aller Risiken."
            statsHint="+15 Gewissen | +20 Gefahr | −10 Öffentliche Meinung | Juliette +"
            onClick={handleOffenAufSeite}
          />
          <ChoiceButton
            variant="secondary"
            title="„Vielleicht ist Paris nur für eine Weile besser.“"
            description="Du redest die Ausweisung klein und verweist auf ihre Möglichkeiten."
            statsHint="+10 Innere Leere | +5 Schuld | Juliette −"
            onClick={handleKleinreden}
          />
          <ChoiceButton
            variant="danger"
            title="„Ich kann mir keinen Skandal leisten.“"
            description="Du distanzierst dich klar und stellst deine Karriere in den Vordergrund."
            statsHint="+10 Karriere | +15 Schuld | +10 Innere Leere | Juliette −−"
            onClick={handleDistanzieren}
          />
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-600 space-y-4">
          <p className="text-sm text-gray-300">
            Juliette hält dir ein Foto von euch beiden hin – ein kleines Café,
            Lachen, Licht. Ihr Blick ist nun ernst.
          </p>
          <p className="text-indigo-300">
            „Was willst du eigentlich, Hendrik? Bühne oder Leben? Sag es mir.
            Ohne Applaus.“
          </p>

          <label className="block text-xs uppercase tracking-wide text-gray-400 mt-4 mb-1">
            Deine Antwort an Juliette (Freitext)
          </label>
          <textarea
            className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Schreibe, was Hendrik Juliette in diesem Moment sagt..."
          />

          <button
            disabled={!canEvaluate}
            onClick={evaluateFreeText}
            className={`mt-3 px-4 py-2 rounded-md text-sm font-semibold ${
              canEvaluate
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-slate-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Antwort abschicken und fortfahren
          </button>
          {evaluated && (
            <p className="text-xs text-green-400 mt-2">
              Deine Antwort hat Juliettes Wahrnehmung – und Hendriks Gewissen –
              verändert.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
