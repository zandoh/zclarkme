import type { z } from "zod";
import type { DrumPadSchema } from "~/components/DrumKit/schema";
import { DrumKitPad } from "~/components/DrumKit/DrumKitPad";

interface DrumKitGroupProps {
  drumPads: z.infer<typeof DrumPadSchema>[];
}

export const DrumKitGroup = ({ drumPads }: DrumKitGroupProps) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-sm md:max-w-none mx-auto">
      {drumPads.map((pad) => (
        <DrumKitPad key={pad.key} pad={pad} />
      ))}
    </div>
  );
};
