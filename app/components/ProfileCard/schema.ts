import { z } from "zod";

const SocialLinkSchema = z.object({
    type: z.enum(["linkedin", "github", "email"]),
    url: z.string(),
    label: z.string(),
  });
  
  export const ProfileCardBlockSchema = z.object({
    typename: z.literal("ProfileCard"),
    name: z.string(),
    title: z.string(),
    avatarSrc: z.string(),
    socialLinks: z.array(SocialLinkSchema),
  });