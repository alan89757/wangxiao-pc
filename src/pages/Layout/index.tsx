import React, { ReactNode } from "react";
import { Layout, Flex } from "antd";
import LayoutFooter from "../Layout/Footer";
import LayoutHeader from "../Layout/Header";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  color: "#4D5055",
  height: 98,
  backgroundColor: "#ffffff",
};

const contentStyle: React.CSSProperties = {
  width: '100%',
  margin: '0 auto',
};

const footerStyle: React.CSSProperties = {
  margin: '0 auto',
  padding: 0,
  backgroundColor: '#1F2833',
  paddingTop: 36,
};

const layoutStyle = {
  borderRadius: 8,
  backgroundColor: "#ffffff",
};

interface MainLayoutProps {
  children: ReactNode,
  styles?: any
}

function MainLayout({ children, styles = {} }: MainLayoutProps) {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <LayoutHeader />
      </Header>
      <Content style={{...contentStyle, ...styles}} >{children}</Content>
      <Footer style={footerStyle}>
        <LayoutFooter />
      </Footer>
    </Layout>
  );
}

export default MainLayout;
