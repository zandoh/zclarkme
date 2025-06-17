import { z } from "zod";
import { DrumKitBlockSchema } from "~/components/DrumKit/schema";
import { ProfileCardBlockSchema } from "~/components/ProfileCard/schema";

export const ConfigBlockSchema = z.discriminatedUnion("typename", [
  DrumKitBlockSchema,
  ProfileCardBlockSchema,
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
  {
    typename: "ProfileCard",
    name: "Zac Clark",
    title: "Senior Software Engineer",
    avatarSrc: "/memoji.png",
    socialLinks: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/zrclark/",
        label: "LinkedIn profile",
      },
      {
        type: "github",
        url: "https://github.com/zandoh",
        label: "GitHub profile",
      },
      {
        type: "email",
        url: "mailto:zclarkmail@gmail.com",
        label: "Send email",
      },
    ],
  },
];
