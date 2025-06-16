import { z } from "zod";

export const DrumPadSchema = z.object({
  name: z.string(),
  key: z.string(),
  icon: z.string(),
  sound: z.string(),
});

export const DrumKitBlockSchema = z.object({
  typename: z.literal("DrumKit"),
  drumPads: z.array(DrumPadSchema),
});
