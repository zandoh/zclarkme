import type { z } from "zod";
import type { DrumPadSchema } from "~/components/DrumKit/schema";
import { DrumKitPad } from "~/components/DrumKit/DrumKitPad";

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
