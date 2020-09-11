import React, { Component } from "react";
import classes from "../../styles/card.module.css";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

export default class DetailPage extends Component {
  state = {
    reviews: [
      {
        id: 1,
        name: "p",
        comment: "An amazing article",
        rating: 3,
      },
      {
        id: 1,
        name: "n",
        comment: "Cool one bruh",
        rating: 4,
      },
    ],
  };

  // handleRate(e) {
  //   this.setState({
  //     //   some-property     :e.rating;
  //   });
  // }

  render() {
    return (
      <Container>
        <div className={classes.detailCard}>
          <div className={classes.author}>
            <h1 className={classes.cardTitle_Detail}>This is my detail page</h1>
            <h3>
              Author - <strong>Nithish R</strong>
            </h3>
            <div className={classes.detailRater}>
              Published on 31, Aug 2020
              <span>
                <Rater rating={2} />
              </span>
            </div>
          </div>
          <img src={require("../../download.png")} alt="" />
          <p className={classes.content_Detail}>
            Git is a free and open source distributed version control system.
            Git’s purpose is to keep track of projects and files as they change
            over time with manipulations happening from different users. Git
            stores information about the project’s progress on a repository. A
            repository has commits to the project or a set of references to the
            commits called heads. All this information is stored in the same
            folder as the project in a sub-folder called .git and will mostly be
            hidden by default in most systems. So basically. Git keeps track of
            the changes a couple of people make on a single project and then
            merges the code where people have worked on different parts into one
            project. This way, when someone introduces a bug, you can track down
            the code that introduced the bug by going through the commits.
            Commits must be made to a project to tell git that you’re satisfied
            with the changes you’ve made and want to commit the changes into the
            main branch called master by default. You can then upload the code
            to GitHub or BitBucket where authorised users can either view, pull
            the code or push changes.
          </p>
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
          3. Star */}

        {/* for star use this  */}

        <Rater onRate={this.handleRate} name="userRating" />

        <div className={classes.homeLink_div}>
          <Link className={classes.homeLink} to="/">
            Back to home
          </Link>
        </div>
      </Container>
    );
  }
}
