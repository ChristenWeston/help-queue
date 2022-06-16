import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";

//Under the hood React is actually using a method called React.createElement() to create the HTML elements
// To return multiple elements, the code in a function compelent's return statement must be wrapped in a single JSX element. That will typically be a <div> or <React.Fragment>
// All components returning more than one element must be wrapped in a React.Fragment
function App(){
  return ( 
    <React.Fragment>
      <Header />
      <TicketControl />
    </React.Fragment>
  );
}

export default App;