import React from "react";

import styles from "./Avatar.module.scss";

type AvatarProps = {
  src?: string;
  alt: string;
  letter?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
  return (
    <div className={styles.avatar}>
      {src ? (
        <div>
          <img className={styles.img} src={src} alt={alt} />
        </div>
      ) : (
        <div className={styles.defaultAvatar}>
          <span className={styles.repoFirstLetter}>{letter}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Avatar);
