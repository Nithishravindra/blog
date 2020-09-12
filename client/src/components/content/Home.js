import React, { Component } from "react";
import classes from "../../styles/home.module.css";
import Blogs from "./Blogs";
import { Input, Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchVal: "",
      searchList: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.getSearchResult = this.getSearchResult.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchVal: e.target.value,
    });
  }

  getSearchResult() {
    console.log(this.state.searchVal);
    axios
      .post(
        `http://localhost:4000/api/v1/blogs/searchBlogs/${this.state.searchVal}`
      )
      .then((val) => {
        console.log(val);
        if (val.data.data.blog.length > 0)
          this.setState({ searchList: val.data.data.blog });
      });
  }

  render() {
    console.log(this.state);
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
              placeholder="Search by authorName/title"
              value={this.state.searchVal}
              onChange={this.handleChange}
            />
            <Button
              className={classes.btn}
              type="submit"
              onClick={this.getSearchResult}
            >
              Enter
            </Button>
            {this.state.searchList
              ? this.state.searchList.map((item, idx) => (
                  <Link
                    to={{
                      pathname: `/detailPage/${item.authorName}`,
                      query: { item },
                    }}
                    className={classes.LinkToDetail}
                  >
                    {item.title} - {item.authorName}
                  </Link>
                ))
              : null}
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
