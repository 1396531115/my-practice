import React from 'react';
import { Layout, Icon } from 'antd';
import { Route } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

import SiderMenu from '@/components/common/sider-menu';
import Home from '@/base/home';

interface IProps extends React.Props<any> {
  datas?: any;
}

// 定义prop对象的类型

export default class App extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
    this.changeSelected = (data: any) => {
      this.setState({
        selectedKey: data.key,
      });
    };
  }
  public render() {
    return (
      <div className="App">
        <Layout>
          <Sider collapsible collapsed={this.state.collapsed}>
            <SiderMenu></SiderMenu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <Route path="/home" component={Home}></Route>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
