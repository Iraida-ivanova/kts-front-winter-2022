import React from "react";

import "./ReposSearchPage.css";
import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

const ReposSearchPage = () => {
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [reposList, setReposList] = React.useState<RepoItem[]>([]);
  const [error, setError] = React.useState(null);

  const gitHubStore = new GitHubStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };
  const handleClick = (e: React.MouseEvent) => {
    setIsLoading(true);
    setError(null);
    gitHubStore
      .getOrganizationReposList({
        organizationName: value,
      })
      .then((result: ApiResponse<RepoItem[], any>) => {
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
          setError(result.data);
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="list-repository">
      <Input
        value={value}
        placeholder={"Введите название организации"}
        onChange={handleChange}
      />
      <Button onClick={handleClick} disabled={isLoading}>
        <SearchIcon currentColor={"var(--white-color)"} />
      </Button>
      {isLoading ? (
        <div className={"list-repository-is-loading"}>
          Список репозиториев загружается...
        </div>
      ) : (
        <div className="reposList">
          {!error ? (
            reposList?.map((item) => {
              return <RepoTile item={item} key={item.id} />;
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
