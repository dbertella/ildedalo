import { styled } from "frontity";
import Link from "@frontity/components/link";

export const Footer = () => (
  <Main>
    <Container>
      <Box>
        <h4>Link Utili</h4>
        <ListWrap>
          <ListItem>
            <Link link="/la-tessera/">La Tessera</Link>
          </ListItem>
          <ListItem>
            <Link link="/come-iscriversi/">Come Iscriversi ai Corsi</Link>
          </ListItem>
          <ListItem>
            <Link link="/regolamento-corsi/">Regolamento Corsi</Link>
          </ListItem>
          <ListItem>
            <Link link="/amministrazione-trasparente/">
              Amministrazione Trasparente
            </Link>
          </ListItem>
        </ListWrap>
      </Box>
      <Box>
        <h4>Dove Siamo</h4>
        <span aria-label="love" css={{ marginRight: "0.5rem" }}>
          🌿
        </span>
        Il Dedalo si trova a Casatenovo, in via Garibaldi 5
        <ListItem>
          <a href="https://www.facebook.com/ildedalo">Facebook</a> ·{" "}
          <a href="https://www.instagram.com/_ildedalo_/">Instagram</a> ·{" "}
          <a href="https://goo.gl/maps/cKBwARWrqwyhCdYT7">Maps</a>
        </ListItem>
      </Box>
    </Container>
  </Main>
);

const Main = styled.div`
  display: flex;
  justify-content: center;
  background: rgb(62, 59, 63);
  color: white;
`;
const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
  font-size: 0.9rem;
  @media (min-width: 420px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
  }
`;
const Box = styled.div``;
const ListWrap = styled.ul`
  padding: 0;
`;
const ListItem = styled.li`
  color: rgb(255, 185, 99);
  list-style-type: none;
  margin: 1rem 0;
`;
