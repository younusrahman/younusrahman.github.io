import React from "react";
import { AiOutlineFacebook } from "react-icons/ai";
import { RiLinkedinBoxLine } from "react-icons/ri";
import { LiaTwitterSquare, LiaGithubSquare } from "react-icons/lia";
import { ThemeColor } from "context/types";
import { socialLinksData } from "../../Pages/about/data";

interface SocialLinksGroupProps {
  color: ThemeColor;
  styles: {
    [key: string]: string;
  };
}

const iconComponents = {
  AiOutlineFacebook,
  RiLinkedinBoxLine,
  LiaTwitterSquare,
  LiaGithubSquare,
};

export const SocialLinksGroup: React.FC<SocialLinksGroupProps> = ({
  color,
  styles,
}) => {
  return (
    <div className={styles.socialLinksgroup}>
      {socialLinksData.map((link) => {
        const IconComponent =
          iconComponents[link.icon as keyof typeof iconComponents];
        return (
          <div key={link.id} className={styles.socialLinksImg}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <IconComponent className={styles.socialLinksImg} color={color} />
            </a>
          </div>
        );
      })}
    </div>
  );
};
