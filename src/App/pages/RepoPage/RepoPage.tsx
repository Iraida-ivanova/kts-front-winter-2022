import React, { useEffect, useState } from "react";

import "./RepoPage.css";
import RepoTile from "@components/RepoTile";
import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { useParams } from "react-router-dom";
const gitHubStore = new GitHubStore();
const RepoPage = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState<RepoItem>({});
  useEffect(() => {
    gitHubStore
      .getRepo({ repoId: Number(id) })
      .then((result: ApiResponse<RepoItem, any>) => {
        if (result.success) {
          setRepo({
            id: result.data.id,
            url: result.data.url,
            name: result.data.name,
            stargazers_count: result.data.stargazers_count,
            owner: result.data.owner,
            updated_at: result.data.updated_at,
          });
        }
      });
  }, [id]);

  return (
    <div>
      <h2>{repo.name}</h2>
    </div>
  );
};

export default RepoPage;
