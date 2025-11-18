// src/scenes/LotteScene.tsx
import React from "react";
import { StatsDisplay } from "../components/StatsDisplay";
import { ChoiceButton } from "../components/ChoiceButton";
import { useGame } from "../engine/GameContext";

export const LotteScene: React.FC = () => {
  const { updateStats, updateRelationship, setFlag, changeScene } = useGame();

  const handleBestaerken = () => {
    updateStats({
      karriere: +10,
      ministerpraesidentGunst: +10,
      gewissen: -5,
      innereLeere: +10,
    });
    updateRelationship("lotteLindenthal", +5);
    setFlag("lotteProtektion", true);
    changeScene("miklas");
  };

  const handleWidersprechen = () => {
    updateStats({ gewissen: +5, karriere: -5 });
    updateRelationship("lotteLindenthal", -5);
    changeScene("miklas");
  };

  const handleKompromiss = () => {
    updateStats({ gewissen: +5, ministerpraesidentGunst: +5 });
    updateRelationship("lotteLindenthal", +10);
    changeScene("miklas");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-red-900 p-6 md:p-10 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <StatsDisplay />

        <div className="bg-slate-800 p-8 rounded-lg mb-6 border border-red-500 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-amber-400">
            Empfang im Palais – Lotte Lindenthal
          </h2>
          <p className="mb-4 text-sm text-gray-300">
            Nach der Premiere. Im Palais des Ministerpräsidenten, Kronleuchter,
            Parfüm, Marschmusik aus dem Nebensaal. Lotte zieht dich in eine
            Fensternische.
          </p>
          <div className="space-y-2 text-base leading-relaxed">
            <p>
              <span className="text-rose-300 font-semibold">Lotte:</span> „Also
              ich fand es großartig, Hendrik. Vor allem die Szene mit den
              Fahnen! Das müssen wir öfter machen. Die Leute sollen stolz sein,
              wenn sie ins Theater gehen, nicht so… verstört.“
            </p>
            <p>
              <span className="text-amber-300 font-semibold">Hendrik:</span>{" "}
              „Theater darf auch verstören, Lotte. Sonst…“
            </p>
            <p>
              <span className="text-rose-300 font-semibold">Lotte:</span> „Ach,
              du Künstler! Immer alles so schwer. Die Menschen haben es schwer
              genug. Sie wollen etwas Schönes sehen. Ein schönes Gesicht, schöne
              Kleider, schöne Musik. Nicht ständig Probleme.“
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <ChoiceButton
            variant="danger"
            title="„Du hast recht – vielleicht war ich zu ‚künstlerisch‘.“"
            description="Du bestätigst Lottes Kitsch-Vorstellung und passt dich an die Stimmung des Regimes an."
            statsHint="+10 Karriere | +10 Gunst Ministerpräsident | −5 Gewissen | +10 Innere Leere"
            onClick={handleBestaerken}
          />
          <ChoiceButton
            variant="primary"
            title="„Glück hält nicht, wenn alles Lüge ist.“"
            description="Du widersprichst vorsichtig und verteidigst ein Theater, das mehr kann als nur beruhigen."
            statsHint="+5 Gewissen | −5 Karriere | Lotte −"
            onClick={handleWidersprechen}
          />
          <ChoiceButton
            variant="success"
            title="„Vielleicht können wir beides versuchen.“"
            description="Du schlägst ein Stück vor, das schön aussieht, aber trotzdem etwas sagt – ein Kompromiss."
            statsHint="+5 Gewissen | +5 Gunst Ministerpräsident | Lotte ++"
            onClick={handleKompromiss}
          />
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-600 text-sm text-gray-300 space-y-3">
          <p>
            Lotte lächelt dich an, ihre Augen glänzen – weniger aus Verständnis
            als aus dem Gefühl, von einem Star beachtet zu werden. Im Saal
            lacht der Ministerpräsident laut.
          </p>
          <p className="italic text-gray-400">
            Je enger du dich an Lottes Vorstellungen bindest, desto schneller
            kletterst du die Karriereleiter – und desto flacher wird der Boden,
            auf dem du stehst.
          </p>
        </div>
      </div>
    </div>
  );
};
