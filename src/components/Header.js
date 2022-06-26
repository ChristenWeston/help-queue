import React from "react";
import ticketsImage from "./../img/ticketImage.webp";
import { Link } from "react-router-dom";

//Since we are only returning one element, we do not need to wrap our JSX code in a <React.Fragment>

function Header(){
  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <img src={ticketsImage} id="ticket" alt="An image of tickets" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Header;