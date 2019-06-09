import React, { Component } from "react";
import { Header, Footer } from "./components";
import { BookList } from "./containers";

/**
 * Main Component
 */
export class App extends Component<{}, {}> {

  public render() {
    return (
      <>
        <Header />
        <div className="container">
          <BookList />
        </div>
        <Footer />
      </>
    );
  }

}
