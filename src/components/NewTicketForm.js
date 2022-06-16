import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import Moment from 'moment';

function NewTicketForm(props){
  function handleNewTicketFormSubmission(event) {
    // Event.preventDefault to prevent the default behavior of the HTML submit button which is to submit data and refresh the page
    event.preventDefault();
    //Because a function component doesn't have this as a reference like a class component, we need to directly refer to the props passed into the function component. That's why we do props.onNewTicketCreation() instead of this.onNewTicketCreation() (as we'd do if this were a class component).
    //nNewTicketCreation() is the callback from the parent component even though it has a different name now. 
    // The "handleAddingNewTicketToList" method is invoked in TicketControl
    props.onNewTicketCreation({
      names: event.target.names.value,
      location: event.target.location.value, 
      issue: event.target.issue.value,
      id: v4(),
      timeOpen: new Moment(),
      formattedWaitTime: new Moment().fromNow(true)
    });
  }
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;