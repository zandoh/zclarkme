import type { z } from "zod";
import type { DrumPadSchema } from "./schema";
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
      className="flex flex-col items-center space-y-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2"
      aria-label={`${pad.name} drum pad`}
      role="button"
      tabIndex={0}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        <span
          className={`text-2xl transition-transform duration-75 ${
            isPressed ? "scale-75" : "scale-100"
          }`}
        >
          {pad.icon}
        </span>
      </div>
      <kbd
        className={`px-2 py-1 text-xs font-mono rounded-md border transition-colors ${
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
