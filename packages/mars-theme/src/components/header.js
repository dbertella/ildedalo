import { connect, styled, Image } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";
import logo from "../images/dedalo.png";

const Header = ({ state }) => {
  return (
    <>
      <Container>
        <StyledLink link="/">
          <Logo />
        </StyledLink>
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


const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  width: 200px;
  height: 100px;
  background: url(${logo}) center center;
  background-size: contain;
`;
