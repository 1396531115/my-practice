import React from 'react';
import { Layout, Icon, Breadcrumb } from 'antd';
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
      curRouter: ['主页'],
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
    this.changeCrumb = (data: any) => {
      this.setState({
        curRouter: data,
      });
    };
  }
  public render() {
    return (
      <div className="App">
        <Layout>
          <Sider collapsible collapsed={this.state.collapsed}>
            <SiderMenu changeBreadcrumb={this.changeCrumb}></SiderMenu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className="breadcrumb-box">
                {this.state.curRouter.map((item: any) => {
                  return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
                })}
              </div>
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
