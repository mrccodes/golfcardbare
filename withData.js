import React from "react";

import Context from "./context.js";

const withData = Component => {
  class DataComponent extends React.Component {
    render() {
      return (
        <Context.Consumer>
          {(data) => <Component data={data} {...this.props}  />}
        </Context.Consumer>
      );
    }
  }

  return DataComponent;
};

export default withData;