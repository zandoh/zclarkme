import type { z } from "zod";
import type { DrumPadSchema } from "./schema";
import { DrumKitPad } from "./DrumKitPad";

interface DrumKitGroupProps {
  drumPads: z.infer<typeof DrumPadSchema>[];
}

export const DrumKitGroup = ({ drumPads }: DrumKitGroupProps) => {
  return (
    <div className="flex gap-4">
      {drumPads.map((pad) => (
        <DrumKitPad key={pad.key} pad={pad} />
      ))}
    </div>
  );
};
