import { z } from "zod";
import { DrumKitBlockSchema } from "~/components/DrumKit/schema";


export const ConfigBlockSchema = z.discriminatedUnion("typename", [
  DrumKitBlockSchema,
]);

export const ConfigSchema = z.array(ConfigBlockSchema);

export const configData = [
  {
    typename: "DrumKit",
    drumPads: [
      {
        name: "KickDrum",
        key: "KeyA",
        icon: "👢",
        sound: "/sounds/kick.wav",
      },
      {
        name: "SnareDrum",
        key: "KeyS",
        icon: "🥁",
        sound: "/sounds/snare.wav",
      },
      {
        name: "Hi-Hat",
        key: "KeyD",
        icon: "🔔",
        sound: "/sounds/hihat.wav",
      },
      {
        name: "CrashCymbal",
        key: "KeyJ",
        icon: "💥",
        sound: "/sounds/crash.wav",
      },
      {
        name: "Cowbell",
        key: "KeyK",
        icon: "🔔",
        sound: "/sounds/cowbell.wav",
      },
      {
        name: "Clap",
        key: "KeyL",
        icon: "👏",
        sound: "/sounds/clap.wav",
      },
    ],
  },
];
