import "./RepoTile.css";
import React from "react";
import "./RepoTile.css";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { RepoItem } from "@store/GitHubStore/types";

type RepoTileProps = {
  item: RepoItem;
  onClick: (id: number) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  const getUpdateDate = (date: Date) => {
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day: number = new Date(date).getDate();
    const month: string = monthNames[new Date(date).getMonth()];
    return `${day} ${month}`;
  };
  const handleClick = () => onClick(item.id);
  return (
    <div className="git-repo-tile" onClick={handleClick}>
      <Avatar
        src={item.owner.avatar_url}
        alt={"Avatar"}
        letter={item.owner.login[0].toUpperCase()}
      />
      <div className="git-repo-tile__content">
        <b className="git-repo-tile__repo-name">{item.name}</b>
        <p className="git-repo-tile__org-name">
          <a
            href={item.owner.html_url}
            className="git-repo-tile__org-link"
            target={"blank"}
          >
            {item.owner?.login}
          </a>
        </p>
        <div className="git-repo-tile__info">
          <span className="git-repo-tile__rating">
            <StarIcon />
            {" " + item.stargazers_count}
          </span>
          <span className="git-repo-tile__update-date">
            Updated {getUpdateDate(item.updated_at)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RepoTile);
