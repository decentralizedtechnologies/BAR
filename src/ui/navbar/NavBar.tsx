import { Col, Container, Row } from "react-grid-system";
import styles from "./NavBar.module.scss";

export const NavBar = ({ children }) => {
  return (
    <div className={styles.navbar}>
      <Container fluid>
        <Row>
          <Col lg={6}>
            <div className={styles.navbar__logo}>
              <a href="#">LOGO</a>
            </div>
          </Col>
          <Col>
            <div className={styles.navbar__right}>{children}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
