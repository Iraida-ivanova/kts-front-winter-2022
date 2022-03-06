import React, { useEffect } from "react";

import { useReposListContext } from "@App/App";
import RepoTile from "@components/RepoTile/RepoTile";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./ReposList.module.scss";
const ReposList = () => {
  const reposListStore = useReposListContext();

  let navigate = useNavigate();
  const onClickRepoTile = React.useCallback((id: number) => {
    navigate(`${id}`);
  }, []);
  useEffect(() => {
    reposListStore.getOrganizationReposList({
      organizationName: "ktsstudio",
    });
  }, [reposListStore]);

  return (
    <div>
      {reposListStore.meta === Meta.loading ? (
        <div className={styles.listRepositoryIsLoading}>
          Список репозиториев загружается...
        </div>
      ) : (
        <div className={styles.reposList}>
          {reposListStore.meta === Meta.success ? (
            reposListStore.list?.map((item) => {
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

export default React.memo(observer(ReposList));
