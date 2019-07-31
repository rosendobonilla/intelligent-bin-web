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

import CardHeader from "reactstrap/es/CardHeader";
import Link from "react-router-dom/Link";


class Offline extends React.Component {

    render() {

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
                                    <div className="div-user-image-feed ">
                                        <img
                                            alt="..."
                                            className="img-login"
                                            src="#"
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
                                    <small className="text-center errors">Errores</small>

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
                                    <small className="text-center errors">Password</small>

                                </FormGroup>

                                <div className="text-center">
                                    <small className="errors">Error</small>
                                </div>


                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="submit">
                                        Ingresar
                                    </Button>
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
                                Cree una nueva cuenta
                            </small>

                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
}


export default Offline;
