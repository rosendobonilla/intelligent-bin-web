/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  2019{" "}
                  <a
                    className="font-weight-bold ml-1"
                    href="http://www.utpuebla.edu.mx/"
                    target="_blank"
                  >
                    UTPUEBLA
                  </a>
                </div>
              </Col>
              <Col xl="2">
                <Nav>
                  <NavItem>
                    <NavLink
                      href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-auth-footer"
                      target="_blank"
                    >
                      Licencia MIT
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
