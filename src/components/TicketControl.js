import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore } from "react-redux-firebase";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      // formVisibleOnPage: false,
      // Initializing list as an empty array and including it as a prop target
      // Selected ticket starts as null because no ticket has been selected yet
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  // Will not be using
  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount(){
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }
// Important to use arrow notation so that this is automatically bound to its lexical scope, which is an instance of the class itself.
handleClick = () => {
  if (this.state.selectedTicket != null) {
    this.setState({
      selectedTicket: null,
      editing: false
    });
  } else {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }
}

handleAddingNewTicketToList = () => {
  const { dispatch } = this.props;
  const action = a.toggleForm();
  dispatch(action);
}

handleChangingSelectedTicket = (id) => {
  this.props.firestore.get({collection: 'tickets', doc: id}).then((ticket) => {
    // this returns a DocumentSnapshot - a Firestore object. Need to use get method to get all properties except id
    const firestoreTicket = {
      names: ticket.get("names"),
      location: ticket.get("location"),
      issue: ticket.get("issue"),
      id: ticket.id
    }
    this.setState({selectedTicket: firestoreTicket });
  });
}

handleDeletingTicket = (id) => {
  this.props.firestore.delete({collection: 'tickets', doc: id});
  this.setState({selectedTicket: null});
}

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }
// handleEditingTicketInList is passed down to EditTicketForm as onEditTicket()
  handleEditingTicketInList = () => {
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 

    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} 
      onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeletingTicket} 
        onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    } else if (this.props.formVisibleOnPage) {
      // passing mainTicketList down to TicketList here
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      // Because a user will actually be clicking on the ticket in the Ticket component, we will need to pass our new handleChangingSelectedTicket method as a prop.
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

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};
// state comes from our friend Redux
const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);
export default withFirestore(TicketControl);