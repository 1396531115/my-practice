import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;

interface IProps extends React.Props<any> {
  data?: any;
}

export default class SiderMenu extends React.Component<IProps, any> {
  constructor(Props: any) {
    super(Props);
    require('./style.less');
    this.state = {
      menuData: [
        { name: '首页', id: '01', icon: 'home', route: 'home' },
        { name: '首页1', id: '02', icon: 'area-chart' },
        { name: '首页2', id: '03', icon: 'contacts' },
        { name: '首页3', id: '04', icon: 'idcard' },
        { name: '首页5', id: '05', icon: 'shopping' },
        { name: '首页6', id: '06', icon: 'audit' },
      ],
      collapsed: false,
      selectedKey: '01',
    };
  }
  public render() {
    let subMenu = this.state.menuData.map((item: any) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.id}>
            <Link to={'/' + item.route}>
              <Icon type={item.icon}></Icon>
              <span>{item.name}</span>
            </Link>
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
