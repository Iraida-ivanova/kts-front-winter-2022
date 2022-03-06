import React, { createContext, useContext } from "react";

import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import Layout from "./pages/Layout";
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
const gitHubStore = new GitHubStore();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [list, setList] = React.useState<RepoItem[]>([]);
  const [error, setError] = React.useState(null);
  const load = async (value: string) => {
    setIsLoading(true);
    setError(null);

    const result: ApiResponse<RepoItem[], any> =
      await gitHubStore.getOrganizationReposList({
        organizationName: value,
      });
    if (result.success) {
      setIsLoading(false);
      setList(
        result.data.map((item) => ({
          id: item.id,
          url: item.url,
          name: item.name,
          stargazers_count: item.stargazers_count,
          owner: item.owner,
          updated_at: item.updated_at,
          visibility: item.visibility,
          description: item.description,
          topics: item.topics,
        }))
      );
    } else {
      setError(result.data);
      setIsLoading(false);
    }
  };
  return (
    <BrowserRouter>
      <Provider value={{ list, isLoading, load, error }}>
        <Routes>
          <Route path={"/repos/*"} element={<Layout />}>
            <Route index element={<ReposSearchPage />} />
            <Route path={":id"} element={<RepoPage />} />
          </Route>
          <Route path={"*"} element={<Navigate to={"/repos"} />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
