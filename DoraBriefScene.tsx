// src/scenes/DoraBriefScene.tsx
import React, { useState } from "react";
import { StatsDisplay } from "../components/StatsDisplay";
import { ChoiceButton } from "../components/ChoiceButton";
import { useGame } from "../engine/GameContext";

export const DoraBriefScene: React.FC = () => {
  const {
    flags,
    updateStats,
    updateRelationship,
    setFlag,
    changeScene,
  } = useGame();
  const [answer, setAnswer] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const handleVerbrennen = () => {
    updateStats({ schuld: +15, gewissen: -10, innereLeere: +10 });
    setFlag("doraBriefErhalten", false);
    // keine Antwort mehr möglich, einfach weiter
    changeScene("barbara");
  };

  const handleLesenVerstecken = () => {
    updateStats({ gewissen: +10, schuld: +5 });
    updateRelationship("doraMartin", +10);
    setFlag("doraBriefGelesen", true);
    // bleibt in der Szene, um evtl. noch zu antworten
  };

  const evaluateFreeText = () => {
    const text = answer.toLowerCase();

    let deltaGewissen = 0;
    let deltaSchuld = 0;
    let exil = false;

    const reuig =
      text.includes("es tut mir leid") ||
      text.includes("schuld") ||
      text.includes("ich habe mich geirrt") ||
      text.includes("fehler") ||
      text.includes("unrecht");
    const karriereFokus =
      text.includes("karriere") ||
      text.includes("intendant") ||
      text.includes("ruhm") ||
      text.includes("star");
    const flucht =
      text.includes("fliehen") ||
      text.includes("kommen") && text.includes("new york");

    if (reuig) {
      deltaGewissen += 15;
      deltaSchuld -= 5;
    }
    if (karriereFokus) {
      deltaSchuld += 15;
      deltaGewissen -= 5;
    }
    if (flucht) {
      exil = true;
    }

    updateStats({
      gewissen: deltaGewissen,
      schuld: deltaSchuld,
    });

    if (reuig || flucht) {
      setFlag("exilOptionAktiv", true);
    }

    updateRelationship("doraMartin", reuig ? +10 : -5);
    setFlag("doraAntwortGesendet", true);

    setEvaluated(true);
    changeScene("barbara");
  };

  const canEvaluate = answer.trim().length > 5 && !evaluated;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-teal-900 p-6 md:p-10 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <StatsDisplay />

        <div className="bg-slate-800 p-8 rounded-lg mb-6 border border-teal-500 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-amber-400">
            Luftpost aus New York – Dora Martin
          </h2>
          <p className="mb-4 text-sm text-gray-300">
            Dein Intendantenzimmer am Tag, Aktenstapel, ein zu volles
            Tintenfass. Zwischen den Papieren liegt ein Luftpost-Umschlag.
            Absender: New York. Dora Martin.
          </p>

          <div className="space-y-3 text-base leading-relaxed">
            <p className="italic text-gray-400">
              Du drehst den Umschlag in den Händen. Du weißt, dass darin nicht
              nur Papier ist.
            </p>
            <p className="text-gray-200">
              Du reißt ihn auf – mehrere dicht beschriebene Seiten fallen auf
              den Tisch. Du beginnst zu lesen, Doras Stimme liegt über den
              Zeilen.
            </p>
            <p className="text-amber-200">
              „Hendrik, manchmal denke ich, ich hätte dich mir erfunden. Den
              wütenden Jungen von damals, der gegen alles war, was nach Macht
              roch. Und dann lese ich in den Zeitungen von deinem neuen Titel.
              Senator. Staatsrat. Intendant.“
            </p>
            <p className="text-amber-200">
              „Von hier drüben sieht euer deutsches Theater aus wie ein schlecht
              gespieltes Stück. Zu laut, zu pathetisch, zu blutig. Und du
              mittendrin – mit der Sicherheit eines Mannes, der weiß, dass er
              immer Applaus bekommen wird, solange er dem richtigen Regisseur
              gehört.“
            </p>
            <p className="text-amber-200">
              „Ich habe Deutschland verlassen, weil ich das nicht mehr spielen
              wollte. Du bist geblieben. Du wirst deine Gründe haben. Aber es
              gibt einen Unterschied zwischen einem Grund und einer Ausrede.“
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <ChoiceButton
            variant="danger"
            title="Brief ungelesen verbrennen"
            description="Du hältst die Wahrheit nicht aus und vernichtest Doras Worte."
            statsHint="+15 Schuld | −10 Gewissen | +10 Innere Leere"
            onClick={handleVerbrennen}
          />
          <ChoiceButton
            variant="primary"
            title="Brief lesen und verstecken"
            description="Du liest alles, aber zeigst den Brief niemandem. Die Kritik bleibt ein Geheimnis zwischen euch."
            statsHint="+10 Gewissen | +5 Schuld | Dora +"
            onClick={handleLesenVerstecken}
          />
        </div>

        {flags.doraBriefGelesen && (
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-600 space-y-4">
            <p className="text-sm text-gray-300">
              Du legst den Brief zusammen, atmest schwer. New York wirkt
              plötzlich wie ein anderer Planet – weit weg von diesem Zimmer, von
              diesem Regime, von der Rolle, die du dir ausgesucht hast.
            </p>
            <p className="text-amber-200">
              „Du wirst eines Tages entscheiden müssen, Hendrik“, steht in der
              letzten Zeile. „Ob du spielen willst – oder leben.“
            </p>

            <label className="block text-xs uppercase tracking-wide text-gray-400 mt-4 mb-1">
              Deine Antwort an Dora (Freitext)
            </label>
            <textarea
              className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Schreibe, wie Hendrik Dora aus diesem Moment heraus antwortet..."
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
                Deine Antwort hat Doras Bild von dir – und deine Chancen auf ein
                Exil – verändert.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
