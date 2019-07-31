import React from "react";
import PropTypes from 'prop-types';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col, Row
} from "reactstrap";
import Link from "react-router-dom/Link";

import { connect } from 'react-redux';
import { signupUser } from "../../redux/actions/userActions";
import register from "../../assets/img/misc/register.png";
import CardHeader from "reactstrap/es/CardHeader";

class Register extends React.Component {

  constructor(){
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({errors: nextProps.UI.errors});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };

    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  };


  render() {

    const errors = this.state.errors;
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader
                tag="h5"
                className="text-uppercase mb-0"

            >
              <Row>
                <Col className="text-center">
                  <div className=" ">
                    <img
                        alt="..."
                        className="img-login"
                        src={register}
                    />
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Ingrese sus datos para crear una cuenta</small>
              </div>
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Usuario" type="handle" id="handle" name="handle" value={this.state.handle} onChange={this.handleChange}/>
                  </InputGroup>
                  <small className="text-center errors">{errors.handle}</small>

                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Correo" type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                  </InputGroup>
                  <small className="text-center errors">{errors.email}</small>


                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input  placeholder="Contraseña" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                  </InputGroup>
                  <small className="text-center errors">{errors.password}</small>

                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input  placeholder="Confirmar contraseña" type="password" id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange}/>
                  </InputGroup>
                  <small className="text-center errors">{errors.confirmPassword}</small>

                </FormGroup>
                {/*<div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
                  </small>
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>*/}
                <div className="text-center">
                  <small className="errors">{errors.error}</small>
                </div>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={this.handleSubmit}>
                    Crear cuenta
                  </Button>
                </div>
              </Form>
              <br/>
              <Col className="text-center text-black">
                <small>
                  ¿Ya tiene una cuenta? <Link to={`/auth/login`}> Ingrese aquí</Link>
                </small>

              </Col>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

Register.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, {signupUser})(Register);
