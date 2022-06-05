import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class TestControl extends React.Component {
  state = {
    selectedOption: null,
  };

  optionItems = options.map((item) => (
    <option value={item.names}> {item.names} </option>
  ));
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default TestControl;