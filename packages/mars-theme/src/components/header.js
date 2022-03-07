import { connect, styled, Image } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";
import logo from "../images/logo.png";

const Header = ({ state }) => {
  return (
    <>
      <Container>
        <StyledLink link="/">
          <Title>Il Dedalo</Title>
          <Logo />
        </StyledLink>
        <Description>Soul Space</Description>
        <MobileMenu />
      </Container>
      <Nav />
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Container = styled.div`
  width: 848px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 24px;
  color: #232323;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h2`
  margin: 0;
  font-weight: 400;
`;

const Description = styled.h4`
  margin: 0;
  color: #232323;
  font-weight: 400;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 100px;
  height: 50px;
  background: url(${logo}) center center;
  background-size: contain;
`;
