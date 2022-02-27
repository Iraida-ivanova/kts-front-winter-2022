import React, { useEffect, useState } from "react";

import Avatar from "@components/Avatar";
import { getUpdateDate } from "@components/RepoTile/RepoTile";
import StarIcon from "@components/StarIcon/StarIcon";
import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { useParams, Navigate } from "react-router-dom";

import { useReposContext } from "../../App";
import styles from "./RepoPage.module.scss";
const gitHubStore = new GitHubStore();
const RepoPage = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState({
    id: 0,
    url: "",
    name: "",
    stargazers_count: 0,
    owner: { id: 0, html_url: "", avatar_url: "", login: "" },
    updated_at: "",
    visibility: "",
    description: "",
    topics: [],
  });
  const [error, setError] = React.useState(null);
  const ReposContext = useReposContext();
  useEffect(() => {
    async function getRepo() {
      ReposContext.isLoading = true;
      try {
        const result: ApiResponse<RepoItem, any> = await gitHubStore.getRepo({
          repoId: Number(id),
        });
        if (result.success) {
          setRepo({
            id: result.data.id,
            url: result.data.url,
            name: result.data.name,
            stargazers_count: result.data.stargazers_count,
            owner: result.data.owner,
            updated_at: result.data.updated_at,
            visibility: result.data.visibility,
            description: result.data.description,
            topics: result.data.topics,
          });
        } else {
          setError(result.data);
        }
      } finally {
        ReposContext.isLoading = false;
      }
    }
    getRepo();
  }, [id]);

  return (
    <div className={styles.repoPage}>
      {error && <Navigate to={"/repos"} />}
      {ReposContext.isLoading && (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Avatar
              src={repo.owner.avatar_url}
              alt={"Avatar"}
              letter={
                repo.owner.login.length
                  ? repo.owner.login[0].toUpperCase()
                  : undefined
              }
            />
            <div>
              <span className={styles.ownerName}>{repo.owner.login} / </span>
              <span className={styles.repoName}>{repo.name}</span>
            </div>
            <div className={styles.repoVisibility}>{repo.visibility}</div>
          </div>
          {repo.description && (
            <div className={styles.description}>
              <h3>About</h3>
              <p className={styles.descriptionText}>{repo.description}</p>
            </div>
          )}
          {repo.topics.length > 0 && (
            <div className={styles.topics}>
              {repo.topics.map((item) => {
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
              {" " + repo.stargazers_count} stars
            </span>
            <span>Updated {getUpdateDate(repo.updated_at)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoPage;
