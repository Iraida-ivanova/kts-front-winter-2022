import React from "react";

import { useReposListContext } from "App/App";
import Button from "components/Button";
import Input from "components/Input";
import ReposList from "components/ReposList";
import SearchIcon from "components/SearchIcon";
import { observer } from "mobx-react-lite";
import { Meta } from "utils/meta";

import styles from "./ReposSearchPage.module.scss";

const ReposSearchPage: React.FC = () => {
  const reposListStore = useReposListContext();

  return (
    <div className={styles.listRepository}>
      <Input
        value={reposListStore.input.value}
        placeholder={"Введите название организации"}
        onChange={(value) =>
          reposListStore.input.setValue(value)
        }
      />
      <Button
        onClick={() => reposListStore.getOrganizationReposList()}
        disabled={reposListStore.meta === Meta.loading}
      >
        <SearchIcon />
      </Button>
      <ReposList />
    </div>
  );
};
export default observer(ReposSearchPage);
