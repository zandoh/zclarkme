import type { DrumKitBlockSchema } from "app/components/DrumKit/schema";
import type { z } from "zod";
import { DrumKitGroup } from "~/components/DrumKit/DrumKitGroup";

interface DrumKitProps {
  block: z.infer<typeof DrumKitBlockSchema>;
}

export const DrumKit = ({ block }: DrumKitProps) => {
  if (!block.drumPads) {
    return <></>;
  }

  return <DrumKitGroup drumPads={block.drumPads} />;
};
