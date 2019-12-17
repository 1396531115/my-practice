import React from 'react';
interface Props extends React.Props<any> {
  type?: any;
}

export default class Home extends React.Component<Props, any> {
  constructor(Props: any) {
    super(Props);
  }
  showDetail = () => {
    console.log('++++++++++++++++++++++');
  };
  public render() {
    return <div onClick={this.showDetail}>this is home</div>;
  }
}
