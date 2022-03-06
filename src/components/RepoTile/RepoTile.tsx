import "./RepoTile.module.scss";
import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { RepoItem } from "@store/GitHubStore/types";

import styles from "./RepoTile.module.scss";

type RepoTileProps = {
  item: RepoItem;
  onClick: (id: number) => void;
};
export const getUpdateDate = (date: string) => {
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
const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  const handleClick = () => onClick(item.id);
  return (
    <div className={styles.repoTile} onClick={handleClick}>
      <Avatar
        src={item.owner.avatar_url}
        alt={"Avatar"}
        letter={
          item.owner.login.length
            ? item.owner.login[0].toUpperCase()
            : undefined
        }
      />
      <div className={styles.repoTile__content}>
        <b className={styles.repoTile__content__name}>{item.name}</b>
        <p className={styles.repoTile__content__orgName}>
          <a
            href={item.owner.html_url}
            className={styles.orgLink}
            target={"blank"}
          >
            {item.owner?.login}
          </a>
        </p>
        <div className={styles.repoTile__content__info}>
          <span>
            <StarIcon />
            {" " + item.stargazers_count}
          </span>
          <span>Updated {getUpdateDate(item.updated_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RepoTile);
