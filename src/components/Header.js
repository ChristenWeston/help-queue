import React from "react";
import ticketsImage from "./../img/ticketImage.webp";

//Since we are only returning one element, we do not need to wrap our JSX code in a <React.Fragment>

function Header(){
  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <img src={ticketsImage} alt="An image of tickets" />
    </React.Fragment>
  );
}

export default Header;