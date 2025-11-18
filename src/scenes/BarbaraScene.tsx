// src/scenes/BarbaraScene.tsx
import React from "react";
import { StatsDisplay } from "../components/StatsDisplay";
import { ChoiceButton } from "../components/ChoiceButton";
import { useGame } from "../engine/GameContext";

export const BarbaraScene: React.FC = () => {
  const { updateStats, updateRelationship, setFlag, changeScene } = useGame();

  const handleSelbstverteidigung = () => {
    updateStats({ gewissen: -5, schuld: +5 });
    updateRelationship("barbaraBruckner", -5);
    setFlag("barbaraKontaktAufgenommen", true);
    // z.B. nächste Szene:
    changeScene("juliette");
  };

  const handleEhrlichkeit = () => {
    updateStats({ gewissen: +10, schuld: -5 });
    updateRelationship("barbaraBruckner", +5);
    setFlag("barbaraKontaktAufgenommen", true);
    changeScene("juliette");
  };

  const handleGegenangriff = () => {
    updateStats({ gewissen: -10, schuld: +10 });
    updateRelationship("barbaraBruckner", -10);
    setFlag("barbaraKontaktAufgenommen", true);
    changeScene("juliette");
  };

  const handleHilfsangebot = () => {
    updateStats({ gewissen: +10, gefahr: +10, schuld: -5 });
    updateRelationship("barbaraBruckner", +10);
    setFlag("barbaraHilfsangebot", true);
    changeScene("juliette");
  };

  const handleRueckzug = () => {
    updateStats({ schuld: +10, innereLeere: +10 });
    changeScene("juliette");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-red-900 p-6 md:p-10 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <StatsDisplay />
        <div className="bg-slate-800 p-8 rounded-lg mb-6 border border-red-500 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-amber-400">
            Hinterbühne – Barbara Bruckner
          </h2>
          <p className="mb-4 text-sm text-gray-300">
            Berlin, 1933/34 – das Theater ist leer, nur ein einzelner
            Scheinwerfer brennt noch. Barbara lehnt an einer Säule, die
            Zigarette in der Hand, als du – Hendrik – aus der Dunkelheit
            trittst.
          </p>
          <div className="space-y-2 text-base leading-relaxed">
            <p>
              <span className="text-pink-300 font-semibold">Barbara:</span>{" "}
              „Du hast dir wirklich den richtigen Augenblick ausgesucht,
              Hendrik. Eben noch SA-Kolonnen auf dem Platz, und hier drin
              applaudieren sie dir. Es muss… berauschend sein.“
            </p>
            <p>
              <span className="text-amber-300 font-semibold">Hendrik:</span>{" "}
              „Barbara… das ist Theater. Die Menschen brauchen Ablenkung.
              Glaub mir, ich…“
            </p>
            <p>
              <span className="text-pink-300 font-semibold">Barbara:</span>{" "}
              „Nein. Sie brauchen Wahrheit. Aber die spielst du ja nur noch,
              wenn sie ungefährlich ist.“
            </p>
            <p className="italic text-gray-400">
              Sie mustert dich kalt, der Rauch ihrer Zigarette wirkt wie ein
              Kommentar.
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <ChoiceButton
            title="„Du weißt nicht, wie es ist…“"
            description="Du verteidigst dich: Du seist mitten in einer Maschine gefangen und hättest keine Wahl."
            statsHint="-5 Gewissen | +5 Schuld | Barbara −"
            onClick={handleSelbstverteidigung}
          />
          <ChoiceButton
            variant="success"
            title="„Ja. Ich habe Angst.“"
            description="Du gibst offen zu, dass du zu feige bist, zu gehen."
            statsHint="+10 Gewissen | −5 Schuld | Barbara +"
            onClick={handleEhrlichkeit}
          />
          <ChoiceButton
            variant="danger"
            title="„Du übertreibst.“"
            description="Du gehst in den Gegenangriff und wirfst Barbara vor, von außen zu urteilen."
            statsHint="-10 Gewissen | +10 Schuld | Barbara −−"
            onClick={handleGegenangriff}
          />
        </div>

        <div className="bg-slate-800 p-6 rounded-lg mb-4 border border-slate-600">
          <p className="mb-3">
            <span className="text-pink-300 font-semibold">Barbara:</span> „Ich
            habe Mitleid mit dir. Nicht Liebe. Nicht einmal Zorn. Nur Mitleid,
            Hendrik.“
          </p>
          <p className="text-gray-300 mb-4">
            Jemand ruft nach dem Intendanten. Du hast einen Moment, um zu
            entscheiden, wie du diese Begegnung hinterlässt.
          </p>

          <div className="space-y-4">
            <ChoiceButton
              variant="primary"
              title="„Wenn sie dich feuern… ich kann etwas arrangieren.“"
              description="Du bietest Barbara konkrete Hilfe für ein mögliches Exil an."
              statsHint="+10 Gewissen | +10 Gefahr | Barbara + | Barbara-Hilfe-Flag"
              onClick={handleHilfsangebot}
            />
            <ChoiceButton
              variant="secondary"
              title="„Ich muss gehen. Der Ministerpräsident wartet.“"
              description="Du ziehst dich auf deine Rolle zurück und lässt Barbara stehen."
              statsHint="+10 Schuld | +10 Innere Leere"
              onClick={handleRueckzug}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
