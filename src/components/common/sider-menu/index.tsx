import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
const { SubMenu } = Menu;

interface IProps extends React.Props<any> {
  data?: any;
}

class SiderMenu extends React.Component<IProps, any> {
  constructor(Props: any) {
    super(Props);
    require('./style.less');
    this.state = {
      menuData: [
        { name: '首页', id: '01', icon: 'home', route: ['首页'] },
        { name: '首页1', id: '02', icon: 'area-chart', route: ['首页1'] },
        { name: '首页2', id: '03', icon: 'contacts', route: ['首页2'] },
        { name: '首页3', id: '04', icon: 'idcard', route: ['首页3'] },
        { name: '首页5', id: '05', icon: 'shopping', route: ['首页5'] },
        { name: '首页6', id: '06', icon: 'audit', route: ['首页6'] },
      ],
      collapsed: false,
      selectedKey: '01',
    };
    this.changeSelected = (data: any) => {
      const item = this.state.menuData.find((item: any) => {
        if (item.id === data.key) {
          return item;
        }
      });
      this.props.history.push('/' + item.route[item.route.length - 1]);
      this.props.changeBreadcrumb(item.route);
    };
  }
  public render() {
    let subMenu = this.state.menuData.map((item: any) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.id}>
            <Icon type={item.icon}></Icon>
            <span>{item.name}</span>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            title={
              <span>
                <Icon type={item.icon}></Icon> <span>{item.name}</span>
              </span>
            }
            key={item.id}
          ></SubMenu>
        );
      }
    });
    return (
      <div className="side-menu">
        <Menu
          theme="dark"
          mode="inline"
          onClick={this.changeSelected}
          defaultSelectedKeys={[this.state.selectedKey]}
        >
          {subMenu}
        </Menu>
      </div>
    );
  }
}

export default withRouter(SiderMenu);
