import React from 'react';
import Home from '@/base/home/index';

// 定义prop对象的类型
interface Props extends React.Props<any> {
  datas?: any
}
// 定义组件

export default class App extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {

    }
  };
  public render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}
