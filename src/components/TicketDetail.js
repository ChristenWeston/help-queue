import React from "react";
import PropTypes from "prop-types";

function TicketDetail(props){
  // Destructuring our ticket here so that we can say ticket.location isntead of props.ticket.location
  const { ticket, onClickingDelete } = props;

  return (
    <React.Fragment>
      <h1>Ticket Detail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>
      <button onClick={ props.onClickingEdit }>Update Ticket</button>
      <button onClick={()=> onClickingDelete(ticket.id) }>Close Ticket</button>
      <hr/>
    </React.Fragment>
  );
}

TicketDetail.propTypes = {
  ticket: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default TicketDetail;