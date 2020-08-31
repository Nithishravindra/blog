import React from "react";
// import logo from './logo.svg';
// import "./App.css";
// import Navbar from "./components/Navbar/Navbar";
import Content from "./components/content/Home";
import Layout from "./components/layout/Layout";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import DetailPage from "./components/content/DetailPage";
import AddPost from "./components/content/Addpost";

function App() {
  return (
    <>
      <Layout>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component={Content}></Route>
          <Route
            exact
            path="/detailPage/:authorName/:blogID"
            component={DetailPage}
          />
          <Route exact path="/addPost" component={AddPost} />
        </Switch>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
