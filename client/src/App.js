import React from "react";
import Home from "./components/Home";
// import { Layout } from "./components/Layout";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import DetailPage from "./components/DetailPage";
import AddPost from "./components/Addpost";

function App() {
  return (
    <>
      {/* <Layout> */}
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/detailPage/:blogID" component={DetailPage} />
        <Route exact path="/addPost" component={AddPost} />
      </Switch>
      {/* </Layout> */}
      <Footer />
    </>
  );
}

export default App;
