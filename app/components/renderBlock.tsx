import type { z } from "zod";
import { ConfigSchema } from "~/config/ui";
import { DrumKit } from "./DrumKit/DrumKit";
import { createLogger } from "~/lib/logger";

const logger = createLogger({ component: "renderBlock" });

interface RenderOptions {
  key: number;
}

export function renderBlock(block: z.infer<typeof ConfigSchema>[number], { key }: RenderOptions) {
  logger.debug("Rendering block", { typename: block.typename, key });
  
  switch (block.typename) {
    case "DrumKit":
      return <DrumKit key={key} block={block} />;
    default:
      logger.warn("Unknown block type", { typename: block.typename });
      return null;
  }
}
