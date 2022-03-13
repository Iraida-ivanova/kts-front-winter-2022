import React from "react";

import { useReposListContext } from "App/App";
import Button from "components/Button";
import Input from "components/Input";
import ReposList from "components/ReposList";
import SearchIcon from "components/SearchIcon";
import { observer } from "mobx-react-lite";
import InputValueStore from "store/InputValueStore";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/UseLocalStore";

import styles from "./ReposSearchPage.module.scss";

const ReposSearchPage: React.FC = () => {
  const reposListStore = useReposListContext();
  const inputValueStore = useLocalStore(() => new InputValueStore());

  const handleChange = React.useCallback(
    (newValue: string): void => {
      inputValueStore.setValue(newValue);
    },
    [inputValueStore]
  );
  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      reposListStore.getOrganizationReposList({
        organizationName: inputValueStore.value,
      });
    },
    [reposListStore, inputValueStore]
  );
  return (
    <div className={styles.listRepository}>
      <Input
        value={inputValueStore.value}
        placeholder={"Введите название организации"}
        onChange={handleChange}
      />
      <Button
        onClick={handleClick}
        disabled={reposListStore.meta === Meta.loading}
      >
        <SearchIcon />
      </Button>
      <ReposList />
    </div>
  );
};
export default observer(ReposSearchPage);
