import React from "react";
import PropTypes from "prop-types";
import TestControl from "./TestControl";


function Ticket(props){
  return (
    <React.Fragment>
      {/* //Because TicketList is iterating through each individual ticket, each ticket will have its own div with an onClick handler attached. */}
      {/* Use arrow function so that expression isn't evaluated immidately */}
      <div onClick = {() => props.whenTicketClicked(props.id)}>
        { /* We add a div with an onClick function. Don't forget to close out the div below! */}
        <h3>{props.location} - {props.names}</h3>
        <p><em>{props.issue}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string,
  issue: PropTypes.string,
  id: PropTypes.string,
  whenTicketClicked: PropTypes.func
};

export default Ticket;