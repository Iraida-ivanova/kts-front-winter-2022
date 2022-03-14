import React, { useEffect } from "react";

import { useReposListContext } from "App/App";
import RepoTile from "components/RepoTile/RepoTile";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Meta } from "utils/meta";

import styles from "./ReposList.module.scss";
const ReposList = () => {
  const reposListStore = useReposListContext();
  let navigate = useNavigate();
  useEffect(() => {
    reposListStore.input.setValue("ktsstudio");
    reposListStore.getOrganizationReposList();
  }, []);

  return (
    <div>
      {reposListStore.meta === Meta.loading ? (
        <div className={styles.listRepositoryIsLoading}>
          Список репозиториев загружается...
        </div>
      ) : (
        <div className={styles.reposList}>
          {reposListStore.meta === Meta.success ? (
            reposListStore.list.map((item) => {
              return (
                <RepoTile
                  item={item}
                  key={item.id}
                  onClick={(id: number) => {
                    navigate(`${id}`);
                  }}
                />
              );
            })
          ) : (
            <div className={styles.orgNotFound}>
              Организации с таким названием не найдено
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default observer(ReposList);
