import React, { Component } from "react";
import classes from "../../styles/card.module.css";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import axios from "axios";

export default class DetailPage extends Component {
  state = {
    reviews: [],
    data: [],
  };

  // handleRate(e) {
  //   this.setState({
  //     //   some-property     :e.rating;
  //   });
  // }

  componentDidMount() {
    axios
      .get(
        `http://localhost:4000/api/v1/blogs/${this.props.location.query.item._id}`
      )
      .then((val) => {
        console.log(val.data.data.data.reviews);
        this.setState({
          reviews: val.data.data.data.reviews,
          // data: val.data.data.data,
        });
      });
  }

  render() {
    console.log(this.props);

    const item = this.props.location.query.item || null;

    return (
      <Container>
        <div className={classes.detailCard}>
          <div className={classes.author}>
            <h1 className={classes.cardTitle_Detail}>This is my detail page</h1>
            <h3>
              Author - <strong>{item.authorName}</strong>
            </h3>
            <div className={classes.detailRater}>
              Published on {item.createdAt}
              <span>
                <Rater rating={item.averageRating} />
              </span>
            </div>
          </div>
          <img className={classes.cardImg} src={item.photo} alt="" />
          <p className={classes.content_Detail}>{item.text}</p>
        </div>

        {/* comments */}

        <div>
          {this.state.reviews.map((item, index) => (
            <div key={index}>
              Name: {item.name}, Comment: {item.comment},{" "}
              <Rater rating={item.rating} />
            </div>
          ))}
        </div>

        {/* button to be added which accepts   
          1. Name, 
          2. Comment,
         
          
        3.   <Rater onRate={this.handleRate} name="userRating" />
          */}

        {/* for star use this  */}

        <div className={classes.homeLink_div}>
          <Link className={classes.homeLink} to="/">
            Back to home
          </Link>
        </div>
      </Container>
    );
  }
}
