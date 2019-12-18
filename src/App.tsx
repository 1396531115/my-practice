import React from 'react';
import { Route } from 'react-router-dom';
import Home from '@/base/home/index.tsx';

// 定义prop对象的类型
interface Props extends React.Props<any> {
  datas?: any;
}
// 定义组件

export default class App extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <div className="App">
        <Route path="/home" component={Home}></Route>
      </div>
    );
  }
}
