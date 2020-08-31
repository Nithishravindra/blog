import React, { Component } from "react";
import classes from "../../styles/home.module.css";
import autosize from "autosize";

export default class Addpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: "",
      authorName: "",
      date: "",
      description: "",
      file: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.fhandleChange = this.fhandleChange.bind(this);
  }

  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  fhandleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Write your own blog...</h1>

        <form className={classes.form_align} onSubmit={this.handleSubmit}>
          <input
            name="authorName"
            className={classes.input_author}
            type="text"
            placeholder="Enter your name/author"
            onChange={this.handleChange}
          />

          <input
            name="postTitle"
            className={classes.input_title}
            ref={(c) => (this.title = c)}
            type="text"
            placeholder="Title"
            onChange={this.handleChange}
          />

          <input type="file" onChange={this.fhandleChange} />
          <img className={classes.img_selected} src={this.state.file} />

          <textarea
            name="description"
            className={classes.input_textarea}
            // style={style}
            ref={(c) => (this.textarea = c)}
            placeholder="Write your post here..."
            rows={1}
            defaultValue=""
            onChange={this.handleChange}
          />

          <input className={classes.submit} type="submit" />
        </form>
      </div>
    );
  }
}
