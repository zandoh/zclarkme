import type {z} from "zod";
import type { DrumPadSchema } from "./schema";

interface DrumKitGroupProps {
    drumPads: z.infer<typeof DrumPadSchema>[]
}

export const DrumKitGroup = ({drumPads}: DrumKitGroupProps) => {
    return <></>;
}