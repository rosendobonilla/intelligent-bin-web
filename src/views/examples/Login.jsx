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
  Row,
  Col
} from "reactstrap";

import login from '../../assets/img/misc/login.png';

import CardHeader from "reactstrap/es/CardHeader";
import Link from "react-router-dom/Link";

//Redux

import { connect } from 'react-redux';
import {loginUser} from "../../redux/actions/userActions";


class Login extends React.Component {

  constructor(){
    super();

    this.state = {
      email: '',
      password: '',
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
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
        <Col lg="5" md="7">
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
                        src={login}
                    />
                  </div>
                </Col>
              </Row>
            </CardHeader>

            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Ingresa con tus datos</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
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

                <div className="text-center">
                  <small className="errors">{errors.error}</small>
                </div>


                <div className="text-center">
                  { !this.props.user.loading  ?
                      <Button className="my-4" color="primary" type="submit" onClick={ this.handleSubmit }>
                        Ingresar
                      </Button>
                      :
                      <Button className="my-4" color="primary" type="submit" disabled={true}>
                        Cargando...
                      </Button>
                  }
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>¿Olvidó su contraseña?</small>
              </a>
            </Col>
            <Col className="text-right text-white" xs="6">
                <small>
                  Cree una nueva cuenta <Link to={`/auth/signup`}> aquí</Link>
                </small>

            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});


export default connect(mapStateToProps, { loginUser })(Login);
