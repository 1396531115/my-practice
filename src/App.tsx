import React from 'react';
import { Route } from 'react-router-dom';
import Home from '@/base/home/index.tsx';
import { Button } from 'antd';
console.log('--------------', Button);
// import { Layout, Menu, Icon } from 'antd';
// import { Sider } from 'antd/lib/layout/Sider';
// const { Header, Sider, Content } = Layout;

// 定义prop对象的类型
interface Props extends React.Props<any> {
  datas?: any;
}
// 定义组件

// class SiderDemo extends React.Component {
//   state = {
//     collapsed: false,
//   };

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };
export default class App extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  public render() {
    return (
      <div className="App">
        <Button>this is a test</Button>
      </div>
    );
  }
}
