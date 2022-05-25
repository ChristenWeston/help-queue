import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false
    };
  }
// Important to use arrow notation so that this is automatically bound to its lexical scope, which is an instance of the class itself.
  handleClick = () => {
    this.setState(prevState => ({
      //We pass in the current state of the formVisibleOnPage boolean to prevState. Now that we know this value, we can say the new state should be !prevState.formVisibleOnPage (the opposite of the old state).
      formVisibleOnPage: !prevState.formVisibleOnPage}));
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    let addTicketButton = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList />;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick = {this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

export default TicketControl;