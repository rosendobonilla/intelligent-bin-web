import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {
  render() {
      const { user } = this.props;
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="12" md="10">
                <h1 className="display-2 text-white">Bienvenido al perfil de {user}</h1>
                <p className="text-white mt-0 mb-5">
                  Esta es la página de perfil de @{user}. Puedes ver su información
                    o los proyectos que ha realizado.
                </p>
                {/*<Button
                  color="info"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Editar perfil
                </Button>*/}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}


export default UserHeader;
