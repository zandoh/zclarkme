import { z } from "zod";
import { DrumKitBlockSchema } from "~/components/DrumKit/schema";

const SectionBlockSchema = z.object({
  typename: z.literal("Section"),
  title: z.string(),
  description: z.string(),
});

const FloatingNavItemSchema = z.object({
  href: z.string(),
  title: z.string(),
  icon: z.string(),
});

const FloatingNavBlockSchema = z.object({
  typename: z.literal("FloatingNav"),
  items: z.array(FloatingNavItemSchema),
});

export const ConfigBlockSchema = z.discriminatedUnion("typename", [
  DrumKitBlockSchema,
  SectionBlockSchema,
  FloatingNavBlockSchema,
]);

export const ConfigSchema = z.array(ConfigBlockSchema);

export const configData = [
  {
    typename: "DrumKit",
    drumPads: [
      {
        name: "",
        key: "KeyA",
        icon: "",
        sound: "",
      },
      {
        name: "",
        key: "KeyS",
        icon: "",
        sound: "",
      },
      {
        name: "",
        key: "KeyD",
        icon: "",
        sound: "",
      },
      {
        name: "",
        key: "KeyJ",
        icon: "",
        sound: "",
      },
      {
        name: "",
        key: "KeyK",
        icon: "",
        sound: "",
      },
      {
        name: "",
        key: "KeyL",
        icon: "",
        sound: "",
      },
    ],
  },
  {
    typename: "Section",
    title: "Full Stack Developer based in Boston.",
    description: "",
  },
  {
    typename: "FloatingNav",
    items: [
      {
        href: "/resume.pdf",
        title: "Resume",
        icon: "FileText",
      },
      {
        href: "mailto:alex@example.com",
        title: "Email",
        icon: "Mail",
      },
      {
        href: "https://linkedin.com/in/alexchen",
        title: "LinkedIn",
        icon: "Linkedin",
      },
      {
        href: "https://github.com/alexchen",
        title: "GitHub",
        icon: "Github",
      },
    ],
  },
];
