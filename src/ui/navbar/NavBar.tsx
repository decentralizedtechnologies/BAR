import { ReactChild } from "react";
import { Col, Container, Row } from "react-grid-system";
import { BARLogo } from "../icons/BARLogo";
import styles from "./NavBar.module.scss";

export const NavBar: React.FC<{ children?: ReactChild }> = ({ children }) => {
  return (
    <div className={styles.navbar}>
      <Container>
        <Row justify="between">
          <Col lg={3}>
            <div className={styles.navbar__logo}>
              <a href="#">
                <BARLogo />
              </a>
            </div>
          </Col>
          {children && (
            <Col lg={2}>
              <div className={styles.navbar__right}>{children}</div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
