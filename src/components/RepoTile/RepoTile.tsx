import "./RepoTile.module.scss";

import React from "react";

import Avatar from "components/Avatar";
import StarIcon from "components/StarIcon";
import { RepoItemModel } from "store/models/gitHub";

import styles from "./RepoTile.module.scss";

type RepoTileProps = {
  item: RepoItemModel;
  onClick: (id: number) => void;
};
export const getUpdateDate = (date: Date) => {
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
  const day: number = date.getDate();
  const month: string = monthNames[new Date(date).getMonth()];
  return `${day} ${month}`;
};
const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  return (
    <div className={styles.repoTile} onClick={() => onClick(item.id)}>
      <Avatar
        src={item.owner.avatarUrl}
        alt={"Avatar"}
        letter={
          item.owner.login.length
            ? item.owner.login[0].toUpperCase()
            : undefined
        }
      />
      <div className={styles.repoTile__content}>
        <div className={styles.repoTile__content__name}>{item.name}</div>
        <div className={styles.repoTile__content__orgName}>
          <a
            href={item.owner.htmlUrl}
            className={styles.orgLink}
            target={"_blank"}
            rel="noreferrer"
          >
            {item.owner?.login}
          </a>
        </div>
        <div className={styles.repoTile__content__info}>
          <span>
            <StarIcon />
            {" " + item.stargazersCount}
          </span>
          <span>Updated {getUpdateDate(item.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RepoTile);
