import React from "react";

import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import styles from "./MainLayout.module.scss";
const { Header, Footer, Content } = Layout;
const MainLayout: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>Client Api GitHub</Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        <a
          href={"https://github.com/Iraida-ivanova/kts-front-winter-2022.git"}
          className={styles.link}
          target={"blank"}
        >
          Iraida-ivanova/kts-front-winter-2022.git
        </a>
        <div>©2022 Created by Iraida-ivanova</div>
      </Footer>
    </Layout>

    // <div className={styles.App}>
    //   {/*<Header/>*/}
    //   <main>
    //     <Outlet />
    //   </main>
    //   {/*<Footer contacts={contacts}/>*/}
    // </div>
  );
};

export default MainLayout;
