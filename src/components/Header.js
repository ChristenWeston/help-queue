import React from "react";
import ticketsImage from "./../img/ticketImage.webp";
import { Link } from "react-router-dom";
import styled from 'styled-components';

//Since we are only returning one element, we do not need to wrap our JSX code in a <React.Fragment>
const HelpQueueHeader = styled.h1`
  font-size: 24px;
  text-align: center;
  color: white;

  &:hover {
    color: MistyRose;
  }
`;

const StyledWrapper = styled.section`
  background-color: OliveDrab;
  border: 15px solid teal;
  margin: 10px;
  border-color: RebeccaPurple;
`;

function Header(){
  return (
    <StyledWrapper>
      <React.Fragment>
        <HelpQueueHeader>
          <h1>Help Queue</h1>
        </HelpQueueHeader>
        <img src={ticketsImage} id="ticket" alt="An image of tickets" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
      </React.Fragment>
    </StyledWrapper>
  );
}

export default Header;