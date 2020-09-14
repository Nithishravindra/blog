import React, { Component } from 'react';
// import classes from "../styles/detailpage.module.css";
import classes from '../styles/detailpage.module.css';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Input,
  Form,
  FormGroup,
  Label
} from 'reactstrap';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import axios from 'axios';

export default class DetailPage extends Component {
  state = {
    reviews: [],
    data: [],
    name: '',
    comment: '',
    rating: null,
    modal: false
  };

  handleRate(e) {
    this.setState({
      rating: e.rating
    });
  }

  handleModal() {
    this.setState({ modal: !this.state.modal });
  }

  async getDetails() {
    let r = await axios.get(
      `http://localhost:4000/api/v1/blogs/${this.props.match.params.blogID}`
    );

    this.setState({
      reviews: r.data.data.data.reviews,
      data: r.data.data.data
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getDetails();
  }

  componentDidUpdate() {
    this.getDetails();
  }

  postComment() {
    const postComment = {
      name: this.state.name,
      review: this.state.comment,
      rating: this.state.rating
    };

    axios
      .post(
        `http://localhost:4000/api/v1/reviews/${this.props.match.params.blogID}`,
        postComment
      )
      .then((val) => {
        console.log(val.data.data.data.reviews);
      });
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    let item = 0;
    if (this.props.location.query === undefined) {
      item = this.state.data;
    } else {
      item = this.props.location.query.item;
      // console.log(this.props.location.query);
    }
    // console.log(item);

    let date = new Date(item.createdAt);
    let da =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    return (
      <Container>
        <Row className={classes.deatilpage_header}>
          <Col>
            <h1>
              <strong>{item.authorName}</strong>'s blog
            </h1>
          </Col>
        </Row>
        <Row className={classes.margin_top}>
          <Col>
            <h1 className={classes.title_DetailPage}>{item.title}</h1>
            <h3 className={classes.published_date}>
              Published on <strong>{da}</strong>
            </h3>
            <h3 className={classes.published_date}>
              Average Rating{' '}
              <Rater rating={item.averageRating} interactive={false} />
            </h3>
            <img className={classes.cardImg} src={item.photo} alt=""></img>
            <p className={classes.content}>{item.text}</p>
          </Col>
        </Row>
        {this.state.reviews.length > 0 ? (
          <>
            <Row className={classes.margin_top}>
              <Col>
                <h2>Reviews:</h2>
              </Col>
            </Row>

            {this.state.reviews.map((item, index) => (
              <Card
                body
                outline
                md={3}
                key={index}
                className={classes.card_margin}
              >
                <Col>
                  <h4 className={classes.comment_heading}>
                    Name : {item.name}
                  </h4>
                </Col>

                <Col>
                  <h4 className={classes.comments}>Comment : {item.review}</h4>
                </Col>
                <Col className={classes.comment_rater}>
                  <Rater rating={item.rating} interactive={false} />
                </Col>
              </Card>
            ))}
          </>
        ) : null}

        <Row>
          <Col>
            <Button
              className={classes.margin_top}
              onClick={this.handleModal.bind(this)}
            >
              {' '}
              ADD COMMENT
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            {this.state.modal ? (
              <Form>
                <FormGroup>
                  <Label for="">Your Name</Label>
                  <Input
                    type="text"
                    value={this.state.name}
                    name="name"
                    onChange={(e) => this.handleChange(e)}
                    className="form-control"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="">Comment</Label>
                  <Input
                    type="text"
                    value={this.state.comment}
                    name="comment"
                    onChange={(e) => this.handleChange(e)}
                    className="form-control"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="">Rate the blog</Label>
                  <Rater
                    rating={this.state.rating}
                    onRate={this.handleRate.bind(this)}
                    name="userRating"
                  />
                </FormGroup>
                <FormGroup>
                  <Input type="submit" onClick={this.postComment.bind(this)} />
                </FormGroup>
              </Form>
            ) : null}
          </Col>
        </Row>
        <Row className={classes.homeLink}>
          <Col>
            <Link to="/">Back to home</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}
