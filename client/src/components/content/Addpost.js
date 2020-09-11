import React, { Component } from "react";
import classes from "../../styles/home.module.css";
import autosize from "autosize";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Addpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: "",
      authorName: "",
      date: new Date(),
      description: "",
      file: null,
      validation: {
        authorError: "",
        postError: "",
        descError: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.fhandleChange = this.fhandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    let item = { ...this.state.validation };

    if (e.target.name === "authorName") {
      if (e.target.value === "" || this.state.authorName.length < 5) {
        item.authorError = true;
        this.setState({
          validation: item,
        });
      } else {
        item.authorError = false;
        this.setState({
          validation: item,
        });
      }
    } else if (e.target.name === "postTitle") {
      if (e.target.value === "" || this.state.postTitle.length < 5) {
        item.postError = true;
        this.setState({
          validation: item,
        });
      } else {
        item.postError = false;
        this.setState({
          validation: item,
        });
      }
    } else if (e.target.name === "description") {
      if (e.target.value === "" || this.state.description.length < 500) {
        item.descError = true;
        this.setState({
          validation: item,
        });
      } else {
        item.descError = false;
        this.setState({
          validation: item,
        });
      }
    }
  }

  fhandleChange(event) {
    this.setState({
      file: event.target.files[0],
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    const data = {
      authorName: this.state.authorName,
      title: this.state.postTitle,
      email: this.state.email,
      text: this.state.description,
      createdAt: this.state.date,
    };

    formData.append("photo", this.state.file);
    formData.append("data", JSON.stringify(data));

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios
      .post("http://localhost:4000/api/v1/blogs", formData, {})
      .then((res) => {
        console.log(res);
      });
  }

  isDisabled() {
    let check = this.state.validation;
    if (
      check.authorError === false &&
      check.postError === false &&
      check.descError === false &&
      this.state.file !== null
    ) {
      return false;
    }
    return true;
  }

  render() {
    // console.log(this.state);
    return (
      <div>
        <h1>Write your own blog...</h1>
        <form className={classes.form_align} onSubmit={this.handleSubmit}>
          <div>
            <input
              name="authorName"
              className={classes.input_author}
              type="text"
              placeholder="Enter your name/author"
              onChange={this.handleChange}
            />
            {this.state.validation.authorError ? (
              <h5 className={classes.validator}>
                Author Name should be atleast 5 characters
              </h5>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              name="postTitle"
              className={classes.input_title}
              ref={(c) => (this.title = c)}
              type="text"
              placeholder="Title"
              onChange={this.handleChange}
            />
            {this.state.validation.postError ? (
              <h5 className={classes.validator}>
                Title should be atleast 5 characters
              </h5>
            ) : (
              ""
            )}
          </div>

          <input
            type="file"
            onChange={this.fhandleChange}
            className={classes.file}
          />
          <img
            className={classes.img_selected}
            src={this.state.file}
            alt="file"
          />

          <div>
            <textarea
              name="description"
              className={classes.input_textarea}
              ref={(c) => (this.textarea = c)}
              placeholder="Write your post here..."
              rows={1}
              defaultValue=""
              onChange={this.handleChange}
            />
            {this.state.validation.descError ? (
              <h5 className={classes.validator}>
                Description should be atleast 500 characters
              </h5>
            ) : (
              ""
            )}
          </div>

          <input
            className={classes.submit}
            type="submit"
            disabled={this.isDisabled()}
          />
        </form>

        <div className={classes.homeLink_div_addPost}>
          <Link className={classes.homeLink} to="/">
            Back to home
          </Link>
        </div>
      </div>
    );
  }
}
