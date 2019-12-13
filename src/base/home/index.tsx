import React from 'react';

interface Props extends React.Props<any> {
  type?: any
}

export default class Home extends React.Component<Props, any> {
  constructor(Props: any) {
    super(Props)
  }
  public render() {
    return (
      <div>this is home</div>
    )
  }
}