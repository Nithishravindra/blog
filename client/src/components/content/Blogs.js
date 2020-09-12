import React, { Component } from "react";
import {
  Card,
  CardText,
  CardTitle,
  CardImg,
  // Button,
  Container,
} from "reactstrap";
import classes from "../../styles/card.module.css";
import img from "../../download.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Blogs extends Component {
  constructor() {
    super();
    this.state = {
      userID: "",
      placeTitle: "",
      description: "",
      errorMessage: "",
      blogList: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/v1/blogs/getMainBlogs").then((val) => {
      this.setState({ blogList: val.data.data.blog });
    });
  }

  render() {
    const mainBlog = this.state.blogList[0];
    const blogLinks = this.state.blogList.slice(1);
    console.log(blogLinks);
    return (
      <Container>
        {this.state.blogList.length > 0 ? (
          <Card className={classes.border}>
            <CardTitle className={classes.cardTitle}>
              {mainBlog.title}
            </CardTitle>
            <CardImg className={classes.cardImg} src={mainBlog.photo} alt="" />
            <CardText className={classes.content}>{mainBlog.text}</CardText>
          </Card>
        ) : null}

        {this.state.blogList
          ? blogLinks.map((item, index) => (
              <div className={classes.cardLink} key={index}>
                <Link
                  to={{
                    pathname: `/detailPage/${item.authorName}`,
                    query: { item },
                  }}
                  className={classes.LinkToDetail}
                >
                  {item.title} - {item.authorName}
                </Link>
              </div>
            ))
          : null}
      </Container>
    );
  }
}
