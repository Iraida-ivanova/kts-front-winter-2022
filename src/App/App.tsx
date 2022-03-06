import React from "react";

import ReposListStore from "@store/ReposListStore";
import { useLocalStore } from "@utils/UseLocalStore";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import styles from "./App.module.scss";
import RepoPage from "./pages/RepoPage";
import ReposSearchPage from "./pages/ReposSearchPage";

const ReposListContext = React.createContext<ReposListStore | null>(null);
export const Provider = ({ children }: any) => {
  const store = useLocalStore(() => new ReposListStore());
  return (
    <ReposListContext.Provider value={store}>
      {children}
    </ReposListContext.Provider>
  );
};
export const useReposListContext = () => {
  const store = React.useContext(ReposListContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};

const App = () => {
  return (
    <Provider>
      <Routes>
        <Route path={"/repos/*"} element={<Layout />}>
          <Route index element={<ReposSearchPage />} />
          <Route path={":id"} element={<RepoPage />} />
        </Route>
        <Route path={"*"} element={<Navigate to={"/repos"} />} />
      </Routes>
    </Provider>
  );
};
export default App;

function Layout() {
  return (
    <div className={styles.App}>
      {/*<Header/>*/}
      <main>
        <Outlet />
      </main>
      {/*<Footer contacts={contacts}/>*/}
    </div>
  );
}
