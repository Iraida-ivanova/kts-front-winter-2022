import React, { useCallback } from "react";

import { useReposListContext } from "@App/App";
import Button from "@components/Button";
import Input from "@components/Input";
import ReposList from "@components/ReposList";
import SearchIcon from "@components/SearchIcon";
import InputValueStore from "@store/InputValueStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/UseLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./ReposSearchPage.module.scss";

const ReposSearchPage = () => {
  // eslint-disable-next-line no-console
  console.log("render");
  const reposListStore = useReposListContext();
  const inputValueStore = useLocalStore(() => new InputValueStore());

  const handleChange = (newValue: string): void => {
    inputValueStore.setValue(newValue);
  };
  const handleClick = (e: React.MouseEvent) => {
    reposListStore.getOrganizationReposList({
      organizationName: inputValueStore.value,
    });
  };
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
