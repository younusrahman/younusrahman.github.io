import React from "react";
interface ProfilePictureProps {
  styles: {
    [key: string]: string;
  };
  yrimage: string;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ yrimage, styles }) => {
  return <img className={styles.img} src={yrimage} alt="Centred Image" />;
};
