import React, { useEffect } from "react";

import Avatar from "@components/Avatar";
import { getUpdateDate } from "@components/RepoTile/RepoTile";
import StarIcon from "@components/StarIcon/StarIcon";
import RepoItemStore from "@store/RepoItemStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/UseLocalStore";
import { observer } from "mobx-react-lite";
import { Navigate, useParams } from "react-router-dom";

import styles from "./RepoPage.module.scss";

const RepoPage = () => {
  const { id } = useParams();
  const RepoStore = useLocalStore(() => new RepoItemStore());
  useEffect(() => {
    RepoStore.getRepo({
      repoId: Number(id),
    });
  }, [id, RepoStore]);

  return (
    <div className={styles.repoPage}>
      {RepoStore.meta === Meta.error && <Navigate to={"/repos"} />}
      {RepoStore.meta === Meta.success && RepoStore.repo && (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Avatar
              src={RepoStore.repo.owner.avatarUrl}
              alt={"Avatar"}
              letter={
                RepoStore.repo.owner.login.length
                  ? RepoStore.repo.owner.login[0].toUpperCase()
                  : undefined
              }
            />
            <div>
              <span className={styles.ownerName}>
                {RepoStore.repo.owner.login} /{" "}
              </span>
              <span className={styles.repoName}>{RepoStore.repo.name}</span>
            </div>
            <div className={styles.repoVisibility}>
              {RepoStore.repo.visibility}
            </div>
          </div>
          {RepoStore.repo.description && (
            <div className={styles.description}>
              <h3>About</h3>
              <p className={styles.descriptionText}>
                {RepoStore.repo.description}
              </p>
            </div>
          )}
          {RepoStore.repo.topics.length > 0 && (
            <div className={styles.topics}>
              {RepoStore.repo.topics.map((item) => {
                return (
                  <span className={styles.topic} key={item}>
                    {item}
                  </span>
                );
              })}
            </div>
          )}
          <div className={styles.repoInfo}>
            <span>
              <StarIcon />
              {" " + RepoStore.repo.stargazersCount} stars
            </span>
            <span>Updated {getUpdateDate(RepoStore.repo.updatedAt)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(RepoPage);
