import type { z } from "zod";
import type { DrumPadSchema } from "~/components/DrumKit/schema";
import { useKeyPress, useAudio } from "~/lib/hooks";
import { useState } from "react";

interface DrumKitPadProps {
  pad: z.infer<typeof DrumPadSchema>;
}

export const DrumKitPad = ({ pad }: DrumKitPadProps) => {
  const { play } = useAudio(pad.sound);
  const [isEnterPressed, setIsEnterPressed] = useState(false);

  const isKeyPressed = useKeyPress(pad.key, play);
  const isPressed = isKeyPressed || isEnterPressed;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEnterPressed(true);
      play();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEnterPressed(false);
    }
  };

  const handleBlur = () => {
    setIsEnterPressed(false);
  };

  return (
    <button
      onClick={play}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      className="flex flex-col items-center space-y-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-3 w-full"
      aria-label={`${pad.name} drum pad`}
      role="button"
      tabIndex={0}
    >
      <div className="w-14 h-14 md:w-12 md:h-12 flex items-center justify-center">
        <span
          className={`text-3xl md:text-2xl transition-transform duration-75 ${
            isPressed ? "scale-75" : "scale-100"
          }`}
        >
          {pad.icon}
        </span>
      </div>
      <kbd
        className={`px-3 py-2 text-sm md:text-xs font-mono rounded-md border transition-colors ${
          isPressed
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {pad.key.replace("Key", "")}
      </kbd>
    </button>
  );
};
