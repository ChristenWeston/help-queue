// import React from "react";
// import TicketList from "./TicketList";
// import Select from "react-dropdown-select";

// class Dropdown1 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       names: "none",
//     };
//   }

//   optionItems = TicketList.map((item) => (
//     <option value={item.names}> {item.names} </option>
//   ));

//   handleSelect = () => {
//     this.setState((prevState) => ({
//       names: { dropdownSelect },
//     }));
//     console.log(this.setState);
//   };

//   render() {
//     const currentlyVisibleState = this.state.names;

//     return (
//       <>
//         <select
//           names="TicketList.names"
//           id="TicketList.names"
//           // onChange={handleSelect}
//         >
//           {optionItems}
//         </select>
//       </>
//     );
//   }
// }

// export default Dropdown1;