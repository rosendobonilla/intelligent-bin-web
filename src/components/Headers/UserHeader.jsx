import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class UserHeader extends React.Component {
  render() {

      const { user: { credentials: { userHandle }}} = this.props;
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/earth.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-7" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Hola {userHandle}</h1>
                <p className="text-white mt-0 mb-5">
                  Esta es tu página de perfil. Aquí puedes ver tus datos
                  o actualizarlos.
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

const mapStateToProps = state => ({
    user: state.user
})

UserHeader.propTypes = {
    user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(UserHeader);
