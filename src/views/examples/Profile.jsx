import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";


// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { editUserDetails, uploadImage } from "../../redux/actions/userActions";

class Profile extends React.Component {

  state = {
    bio: '',
    direccion: '',
    ciudad: '',
    pais: '',
    cp: '',
    nombre: '',
    apellido: ''
  }

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      direccion: credentials.direccion ? credentials.direccion : '',
      ciudad: credentials.ciudad ? credentials.ciudad : '',
      pais: credentials.pais ? credentials.pais : '',
      cp: credentials.cp ? credentials.cp : '',
      nombre: credentials.nombre ? credentials.nombre : '',
      apellido: credentials.apellido ? credentials.apellido : ''
    })
  }

  componentDidMount() {
    const { user: { credentials }} = this.props;
    this.mapUserDetailsToState(credentials);
  }


  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      direccion: this.state.direccion,
      ciudad: this.state.ciudad,
      pais: this.state.pais,
      cp: this.state.cp,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
    }
    this.props.editUserDetails(userDetails);
  }


  render() {

    const { user: { credentials }} = this.props;

    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={credentials.imageUrl}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  {/*<div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Conectar
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Mensaje
                    </Button>
                  </div>*/}
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <input className="" type="file" hidden="hidden" id="imageInput" onChange={this.handleImageChange}/>

                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">

                        {this.props.user.loading === false ? (
                            <Button
                                color="warning"
                                href="#pablo"
                                size="sm"
                                onClick={this.handleEditPicture}
                            > Cambiar foto de perfil
                            </Button>
                        ) : (
                            <Button
                                color="danger"
                                href="#pablo"
                                size="sm"
                                disabled={true}
                            > Cargando imagen...
                            </Button>
                        )
                        }


                      </div>
                    </div>

                    {/*<div className="col">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Amigos</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Fotos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comentarios</span>
                        </div>
                      </div>
                    </div>*/}
                  </Row>
                  <div className="text-center">
                    <h3>
                      @{credentials.userHandle}
                      {/*<span className="font-weight-light">, 27</span>*/}
                    </h3>
                    {credentials.ciudad && credentials.pais && (
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {credentials.ciudad}, {credentials.pais}
                    </div>
                    )}

                    {credentials.nombre && credentials.apellido && (
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {credentials.nombre} {" "} {credentials.apellido}
                    </div>
                    )}
                    <div>
                      <i className="ni education_hat mr-2" />
                      {credentials.email}
                    </div>
                    <hr className="my-4" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Información</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleSubmit}
                        size="sm"
                      >
                        Actualizar datos
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Usuario
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Usuario
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              disabled={true}
                              placeholder={credentials.userHandle + " -No editable-"}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Correo electrónico
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              disabled={true}
                              placeholder={credentials.email + " - No editable"}
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Nombre
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleChange}
                              id="input-first-name"
                              defaultValue={credentials.nombre}
                              placeholder="Nombre"
                              type="text"
                              name="nombre"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Apellidos
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleChange}
                              id="input-last-name"
                              defaultValue={credentials.apellido}
                              placeholder="Apellidos"
                              type="text"
                              name="apellido"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Información de contacto
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Dirección
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Dirección"
                              defaultValue={credentials.direccion}
                              type="text"
                              onChange={this.handleChange}
                              name="direccion"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Ciudad
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleChange}
                              id="input-city"
                              defaultValue={credentials.ciudad}
                              placeholder="Ciudad"
                              type="text"
                              name="ciudad"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              País
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-country"
                              placeholder="País"
                              defaultValue={credentials.pais}
                              type="text"
                              name="pais"
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Código postal
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Código postal"
                              defaultValue={credentials.cp}
                              type="number"
                              name="cp"
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">Acerca de mí</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>Acerca de mí</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="Escribe algo sobre tí ..."
                          rows="4"
                          name="bio"
                          id="input-bio"
                          type="text"
                          defaultValue={credentials.bio}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { editUserDetails, uploadImage};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
