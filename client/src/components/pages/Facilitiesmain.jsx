import React from "react";
import styled from "styled-components";
import AnchorLink from "react-anchor-link-smooth-scroll";
const Container = styled.div`
  position: relative;

`;
const SidebarContainer = styled.div`
  background-image: linear-gradient(to right, #107bb8,#190A05); 
  width: 8rem;
  height: 40vh;
  margin-top: 1rem;
  border-radius:0px 30px 30px 0px;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  float:left;
`;

const Text = styled.span`
  width:100%;
  color:white;
`;

export const Facilitiesmain = () => {
  return (
    <Container>
      <SidebarContainer>
     
    <AnchorLink href='#pharmacy'><Text>Pharmacy</Text></AnchorLink>
     <AnchorLink href='#lab'> <Text>Laboratory</Text></AnchorLink>
     <AnchorLink href='#icu'> <Text>ICU</Text></AnchorLink>
     <AnchorLink href='#checkup'> <Text>Master Checkup</Text></AnchorLink>
     <AnchorLink href='#physiotherapy'> <Text>Physiotherapy</Text></AnchorLink>
      </SidebarContainer>
    </Container>
  );
};