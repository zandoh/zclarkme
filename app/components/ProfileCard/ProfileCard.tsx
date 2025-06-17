import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Linkedin, Github, Mail } from "lucide-react";
import React from "react";

interface SocialLink {
  type: "linkedin" | "github" | "email";
  url: string;
  label: string;
}

export interface ProfileCardProps {
  name: string;
  title: string;
  avatarSrc: string;
  avatarAlt?: string;
  socialLinks: SocialLink[];
}

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  avatarSrc,
  avatarAlt = "Profile avatar",
  socialLinks,
}) => {
  return (
    <div className="flex items-center gap-6 max-w-xl w-full">
      <div className="flex-shrink-0">
        <Avatar className="w-20 h-20">
          <AvatarImage src={avatarSrc} alt={avatarAlt} />
          <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold mb-1">{name}</h2>
        <p className="text-base text-muted-foreground">{title}</p>
      </div>
      <div className="flex flex-col gap-2 items-end">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.type];
          
          return (
            <a
              key={link.type}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              {Icon && <Icon className="w-6 h-6" />}
            </a>
          );
        })}
      </div>
    </div>
  );
}; 