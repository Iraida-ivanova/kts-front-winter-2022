import React, { createContext, useContext } from "react";

import "./App.css";
import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import RepoPage from "./pages/RepoPage";
import ReposSearchPage from "./pages/ReposSearchPage";

type ReposContext = {
  list: RepoItem[];
  isLoading: boolean;
  load: (value: string) => void;
  error: any;
};
const ReposContext = createContext<ReposContext>({
  list: [],
  isLoading: false,
  load: (value: string) => {},
  error: null,
});
const Provider = ReposContext.Provider;
export const useReposContext = () => useContext(ReposContext);

const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [list, setList] = React.useState<RepoItem[]>([]);
  const [error, setError] = React.useState(null);
  const gitHubStore = new GitHubStore();
  const load = (value: string) => {
    setIsLoading(true);
    setError(null);
    gitHubStore
      .getOrganizationReposList({
        organizationName: value,
      })
      .then((result: ApiResponse<RepoItem[], any>) => {
        if (result.success) {
          setList(
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
    <Provider value={{ list, isLoading, load, error }}>
      <Routes>
        <Route path={"/repos"} element={<ReposSearchPage />}>
          <Route path={":id"} element={<RepoPage />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
