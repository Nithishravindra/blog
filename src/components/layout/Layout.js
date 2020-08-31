import React from "react";
import classes from "../../styles/layout.module.css";

export default class layout extends React.Component {
  render() {
    return <div className={classes.layout}>{this.props.children}</div>;
  }
}
