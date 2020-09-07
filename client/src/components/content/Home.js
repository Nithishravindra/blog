import React, { Component } from "react";
import classes from "../../styles/home.module.css";
import Blogs from "./Blogs";
import { Input, Button, Container } from "reactstrap";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    searchVal: "",
  };

  handleChange(e) {
    this.setState({
      searchVal: e.target.value,
    });
  }

  render() {
    return (
      <Container>
        <div className={classes.align_main}>
          <div className={classes.head}>
            <h1 className={classes.text}>Blog.</h1>
          </div>
          <div className={classes.inputDiv}>
            <Input
              className={classes.inputSearch}
              type="text"
              placeholder="Search"
              value={this.state.searchVal}
              onChange={this.handleChange.bind(this)}
            />
            <Button className={classes.btn} type="submit">
              Enter
            </Button>
          </div>{" "}
          <div className={classes.addpostDiv}>
            <Link className={classes.addpost} to="/addPost">
              {" "}
              + ADD POST
            </Link>
          </div>
        </div>

        <div className={classes.blogs}>
          <Blogs />
        </div>
      </Container>
    );
  }
}
