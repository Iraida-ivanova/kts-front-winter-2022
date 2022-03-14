import React, { useEffect } from "react";

import Avatar from "components/Avatar";
import { getUpdateDate } from "components/RepoTile/RepoTile";
import StarIcon from "components/StarIcon/StarIcon";
import { observer } from "mobx-react-lite";
import { Navigate, useParams } from "react-router-dom";
import RepoItemStore from "store/RepoItemStore";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/UseLocalStore";

import styles from "./RepoPage.module.scss";

const RepoPage: React.FC = () => {
  const { id } = useParams();
  const repoStore = useLocalStore(() => new RepoItemStore(id));
  useEffect(() => {
    repoStore.getRepo();
  }, [repoStore.id]);

  return (
    <div className={styles.repoPage}>
      {repoStore.meta === Meta.error && <Navigate to={"/repos"} />}
      {repoStore.meta === Meta.loading && <div>Страница загружается...</div>}
      {repoStore.meta === Meta.success && repoStore.repo && (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Avatar
              src={repoStore.repo.owner.avatarUrl}
              alt={"Avatar"}
              letter={
                repoStore.repo.owner.login.length
                  ? repoStore.repo.owner.login[0].toUpperCase()
                  : undefined
              }
            />
            <div>
              <span className={styles.ownerName}>
                {repoStore.repo.owner.login} /{" "}
              </span>
              <span className={styles.repoName}>{repoStore.repo.name}</span>
            </div>
            <div className={styles.repoVisibility}>
              {repoStore.repo.visibility}
            </div>
          </div>
          {repoStore.repo.description && (
            <div className={styles.description}>
              <h3>About</h3>
              <p className={styles.descriptionText}>
                {repoStore.repo.description}
              </p>
            </div>
          )}
          {repoStore.repo.topics.length > 0 && (
            <div className={styles.topics}>
              {repoStore.repo.topics.map((item) => {
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
              {" " + repoStore.repo.stargazersCount} stars
            </span>
            <span>Updated {getUpdateDate(repoStore.repo.updatedAt)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(RepoPage);
