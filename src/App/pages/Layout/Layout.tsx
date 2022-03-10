import React from "react";

import { Outlet } from "react-router-dom";

import styles from "../../App.module.scss";

const Layout: React.FC = () => {
  return (
    <div className={styles.App}>
      {/*<Header/>*/}
      <main>
        <Outlet />
      </main>
      {/*<Footer contacts={contacts}/>*/}
    </div>
  );
};

export default Layout;
