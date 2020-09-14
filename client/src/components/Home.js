import React, { Component } from 'react';
import classes from '../styles/home.module.css';
import Blogs from './Blogs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Input, Button } from 'reactstrap';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchVal: '',
      searchList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.getSearchResult = this.getSearchResult.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchVal: e.target.value
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getSearchResult() {
    axios
      .post(
        `http://localhost:4000/api/v1/blogs/searchBlogs/${this.state.searchVal}`
      )
      .then((val) => {
        console.log(val);
        if (val.data.data.blog.length > 0) {
          this.setState({ searchList: val.data.data.blog, errorMessage: '' });
        } else {
          this.setState({ errorMessage: 'No results found' });
        }
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <h1 className={classes.home_main_title}>Blog.</h1>
        </Row>
        <Row className={classes.row}>
          <Col sm={7}>
            <Input
              type="text"
              name="searchval"
              placeholder="Search by authorName or title"
              value={this.state.searchVal}
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <Button
              outline
              // color="secondary"
              className={classes.home_search_button}
              onClick={this.getSearchResult}
            >
              Enter
            </Button>
          </Col>
        </Row>
        <Row className={classes.search_results}>
          <Col>
            {this.state.searchList
              ? this.state.searchList.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={{
                        pathname: `/detailPage/${item._id}`,
                        query: { item }
                      }}
                      className={classes.LinkToDetail}
                    >
                      {item.title} - {item.authorName}
                    </Link>
                  </li>
                ))
              : null}
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.errorMessage ? (
              <h4> {this.state.errorMessage} </h4>
            ) : null}
          </Col>
        </Row>

        <Row className={classes.row}>
          <Link to="/addPost">
            <Button
              className={classes.add_new_post}
              color="secondary"
              size="g"
              active
            >
              ADD POST
            </Button>
          </Link>
        </Row>

        <Row>
          <Blogs />
        </Row>
      </Container>
    );
  }
}
