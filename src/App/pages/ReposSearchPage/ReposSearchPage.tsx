import React, { useEffect } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import { useNavigate } from "react-router-dom";

import { useReposContext } from "../../App";
import styles from "./ReposSearchPage.module.scss";

const gitHubStore = new GitHubStore();

const ReposSearchPage = () => {
  const [value, setValue] = React.useState("");
  const handleChange = (newValue: string): void => {
    setValue(newValue);
  };
  const ReposContext = useReposContext();
  const handleClick = (e: React.MouseEvent) => {
    ReposContext.load(value);
  };
  let navigate = useNavigate();
  const onClickRepoTile = (id: number) => {
    navigate(`${id}`);
  };
  useEffect(() => {
    ReposContext.load("ktsstudio");
  }, []);

  return (
    <div className={styles.listRepository}>
      <Input
        value={value}
        placeholder={"Введите название организации"}
        onChange={handleChange}
      />
      <Button onClick={handleClick} disabled={ReposContext.isLoading}>
        <SearchIcon />
      </Button>
      {ReposContext.isLoading ? (
        <div className={styles.listRepositoryIsLoading}>
          Список репозиториев загружается...
        </div>
      ) : (
        <div className={styles.reposList}>
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
