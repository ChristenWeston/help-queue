import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

// in props.ticketList.map we loop through the list passed down from TicketControl
function TicketList(props){
  return (
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket) =>
        <Ticket
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          id={ticket.id}
          key={ticket.id}/>
      )}
    </React.Fragment>
  );
}

// Add propTypes for ticketList.
TicketList.propTypes = {
  ticketList: PropTypes.array,
  onTicketSelection: PropTypes.func
};

export default TicketList;
