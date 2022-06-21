import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

// in props.ticketList.map we loop through the list passed down from TicketControl
function TicketList(props){
  useFirestoreConnect([
    { collection: 'tickets' }
  ]);
// Could use this to find a ticket with a specific id: 
//useFirestoreConnect([
//   { collection: 'tickets',
//     doc: ticketId }
// ]);
  const tickets = useSelector(state => state.firestore.ordered.tickets);
  if (isLoaded(tickets)) {
    return (
      <React.Fragment>
        <hr/>
        {tickets.map((ticket) => {
          return <Ticket
            whenTicketClicked = { props.onTicketSelection }
            names={ticket.names}
            location={ticket.location}
            issue={ticket.issue}
            formattedWaitTime={ticket.formattedWaitTime}
            id={ticket.id}
            key={ticket.id}/>
        })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

// Add propTypes for ticketList.
TicketList.propTypes = {
  // ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;
