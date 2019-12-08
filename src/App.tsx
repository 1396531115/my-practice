import React from 'react';

// 定义prop对象的类型
interface Props extends React.Props<any> {
  datas?: any
}
// 定义组件
class Com1 extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      test: '12121'
    }
  }
  // getDefaultProps() {
  //   return {
  //     datas: 'wx'
  //   }
  // }
  public render() {
    return <h1>this is a test111, { this.state.test }</h1>
  }
}
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Com1 datas="wangXin"/>
      </header>
    </div>
  );
}

export default App;
