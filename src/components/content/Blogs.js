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

export default class Blogs extends Component {
  constructor() {
    super();
    this.state = {
      userID: "",
      placeTitle: "",
      description: "",
      errorMessage: "",
      blogList: [
        {
          authorName: "Nithi",
          cardTitle: " Understanding git",
        },
        {
          authorName: "Ramio",
          cardTitle: "Learn to dance ass",
        },
        {
          authorName: "Nithi",
          cardTitle: " Understanding git",
        },
        {
          authorName: "Ramio",
          cardTitle: "Learn to dance ass",
        },
      ],
    };
  }

  render() {
    return (
      <Container>
        <Card className={classes.border}>
          <CardTitle className={classes.cardTitle}>Gittttt</CardTitle>
          <CardImg className={classes.cardImg} src={img} alt="" />
          <CardText className={classes.content}>
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
          </CardText>
        </Card>

        {this.state.blogList.map((item, index) => (
          <div className={classes.cardLink}>
            <Link
              to={{
                pathname: `/detailPage/${item.authorName}/${item.cardTitle}`,
              }}
              key={index}
              className={classes.LinkToDetail}
            >
              {item.authorName} - {item.cardTitle}
            </Link>
          </div>
        ))}
      </Container>
    );
  }
}
