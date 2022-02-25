import React, { useEffect } from "react";

import "./ReposSearchPage.css";
import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

const gitHubStore = new GitHubStore();

const ReposSearchPage = () => {
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [reposList, setReposList] = React.useState<RepoItem[]>([]);
  const [error, setError] = React.useState(null);
  const handleChange = (value: string): void => {
    setValue(value);
  };
  const onClickRepoTile = (id: number) => {};
  const handleClick = async (e: React.MouseEvent) => {
    setIsLoading(true);
    setError(null);
    try {
      const result: ApiResponse<RepoItem[], any> =
        await gitHubStore.getOrganizationReposList({
          organizationName: value,
        });
      if (result.success) {
        setReposList(
          result.data.map((item) => ({
            id: item.id,
            url: item.url,
            name: item.name,
            stargazers_count: item.stargazers_count,
            owner: item.owner,
            updated_at: item.updated_at,
          }))
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error();
      }
    } catch (err: any) {
      setError(err);
    }
  };
  useEffect(() => {
    async function getInitialRepo() {
      const result = await gitHubStore.getOrganizationReposList({
        organizationName: "ktsstudio",
      });
      if (result.success) {
        setReposList(
          result.data.map((item) => ({
            id: item.id,
            url: item.url,
            name: item.name,
            stargazers_count: item.stargazers_count,
            owner: item.owner,
            updated_at: item.updated_at,
          }))
        );
      }
    }
    getInitialRepo();
  }, []);
  return (
    <div className="list-repository">
      <Input
        value={value}
        placeholder={"Введите название организации"}
        onChange={handleChange}
      />
      <Button onClick={handleClick} disabled={isLoading}>
        <SearchIcon />
      </Button>
      {isLoading ? (
        <div className={"list-repository-is-loading"}>
          Список репозиториев загружается...
        </div>
      ) : (
        <div className="reposList">
          {!error ? (
            reposList?.map((item) => {
              return (
                <RepoTile item={item} key={item.id} onClick={onClickRepoTile} />
              );
            })
          ) : (
            <div>Организации с таким названием не найдено</div>
          )}
        </div>
      )}
    </div>
  );
};
export default ReposSearchPage;
