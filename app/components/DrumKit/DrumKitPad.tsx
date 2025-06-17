import type { z } from "zod";
import type { DrumPadSchema } from "~/components/DrumKit/schema";
import { useKeyPress, useAudio } from "~/lib/hooks";
import { useRef } from "react";

interface DrumKitPadProps {
  pad: z.infer<typeof DrumPadSchema>;
}

export const DrumKitPad = ({ pad }: DrumKitPadProps) => {
  const { play } = useAudio(pad.sound);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isKeyPressed = useKeyPress(pad.key, play, buttonRef);

  const handleClick = () => {
    play();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="flex flex-col items-center space-y-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-3 w-full touch-manipulation select-none group"
      aria-label={`${pad.name} drum pad`}
      role="button"
      tabIndex={0}
    >
      <div className="w-14 h-14 md:w-12 md:h-12 flex items-center justify-center select-none">
        <span className={`text-3xl md:text-2xl transition-transform duration-75 select-none group-active:scale-75 ${isKeyPressed ? "scale-75" : "scale-100"}`}>
          {pad.icon}
        </span>
      </div>
      <kbd
        className={`hidden md:block px-3 py-2 text-sm md:text-xs font-mono rounded-md border transition-colors select-none group-active:bg-primary group-active:text-primary-foreground ${
          isKeyPressed
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {pad.key.replace("Key", "")}
      </kbd>
    </button>
  );
};
