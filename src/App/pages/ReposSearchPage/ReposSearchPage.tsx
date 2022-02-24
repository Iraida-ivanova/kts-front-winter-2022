import React from "react";

import { Navigate } from "react-router-dom";
import "./ReposSearchPage.css";
import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";

import { useReposContext } from "../../App";

const ReposSearchPage = () => {
  const [value, setValue] = React.useState("");
  const handleChange = (value: string): void => {
    setValue(value);
  };
  const ReposContext = useReposContext();
  const handleClick = (e: React.MouseEvent) => {
    ReposContext.load(value);
  };
  const onClickRepoTile = (id: number) => {
    return <Navigate to={`:${id}`} />;
  };

  return (
    <div className="list-repository">
      <Input
        value={value}
        placeholder={"Введите название организации"}
        onChange={handleChange}
      />
      <Button onClick={handleClick} disabled={ReposContext.isLoading}>
        <SearchIcon />
      </Button>
      {ReposContext.isLoading ? (
        <div className={"list-repository-is-loading"}>
          Список репозиториев загружается...
        </div>
      ) : (
        <div className="reposList">
          {!ReposContext.error ? (
            ReposContext.list?.map((item) => {
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
