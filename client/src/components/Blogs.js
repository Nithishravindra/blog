import React, { Component } from 'react';
import { Card, Row, Col, Container } from 'reactstrap';
import classes from '../styles/card.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Blogs extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: '',
      blogList: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/v1/blogs/getMainBlogs').then((val) => {
      this.setState({ blogList: val.data.data.blog });
    });
  }

  render() {
    const mainBlog = this.state.blogList[0];
    const blogLinks = this.state.blogList.slice(1);
    // console.log(blogLinks);
    return (
      <Container className={classes.featured_blog}>
        <h2>Featured blogs...</h2>
        {this.state.blogList.length > 0 ? (
          <Card className={classes.blog_border}>
            <Row>
              <Col>
                <h2 className={classes.featuredblog_title}>{mainBlog.title}</h2>
              </Col>
              <Col>
                <h4 className={classes.featuredblog_authorname}>
                  - By {mainBlog.authorName}
                </h4>
              </Col>
            </Row>

            <Row>
              <img
                className={classes.featuredblog_cardImg}
                src={mainBlog.photo}
                alt=""
              />
            </Row>
            <Row>
              <p className={classes.featuredblog_content}>{mainBlog.text}</p>
            </Row>
          </Card>
        ) : null}

        <h3>Someother featured blogs</h3>

        <Row>
          {this.state.blogList
            ? blogLinks.map((item, index) => (
                <Col sm="3" key={index} className={classes.featuredblogs_links}>
                  <Link
                    to={{
                      pathname: `/detailPage/${item._id}`,
                      query: { item }
                    }}
                  >
                    <Card className={classes.featuredCards}>
                      <h2 className={classes.featuredCards_title}>
                        Title: {item.title}
                      </h2>
                      <h3 className={classes.featuredCards_author}>
                        {' '}
                        Author: {item.authorName}
                      </h3>
                    </Card>
                  </Link>
                </Col>
              ))
            : null}
        </Row>
      </Container>
    );
  }
}
