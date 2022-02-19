import React from "react";
import "./Avatar.css";

type AvatarProps = {
  src?: string;
  alt: string;
  letter: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
  return (
    <div className="git-repo-tile__avatar">
      {src ? (
        <div>
          <img className="git-repo-tile__img" src={src} alt={alt} />
        </div>
      ) : (
        <div className="git-repo-tile__default-avatar">
          <span className="git-repo-tile__repo-first-letter">{letter}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Avatar);
