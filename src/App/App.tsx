import React from "react";

import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import ReposListStore from "store/ReposListStore";
import { useLocalStore } from "utils/UseLocalStore";

import "antd/dist/antd.min.css";
import MainLayout from "./pages/Layout";
import RepoPage from "./pages/RepoPage";
import ReposSearchPage from "./pages/ReposSearchPage";

const ReposListContext = React.createContext<ReposListStore>(
  new ReposListStore()
);
export const useReposListContext = () => {
  return React.useContext(ReposListContext);
};

const App: React.FC = () => {
  const Provider = ({ children }: any) => {
    const store = useLocalStore(() => new ReposListStore());
    return (
      <ReposListContext.Provider value={store}>
        {children}
      </ReposListContext.Provider>
    );
  };
  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path={"/repos/*"} element={<MainLayout />}>
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
