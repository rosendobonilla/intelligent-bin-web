import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col
} from "reactstrap";


// core components
import UserPageHeader from "components/Headers/UserPageHeader.jsx";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import routes from "routes.js";


import CardProject from '../../components/Projects/CardProject';
import {getUserData} from "../../redux/actions/dataActions";
import axios from "axios";
import ProjectDialog from '../../components/Projects/PhotoDialog';


class UserPage extends React.Component {

  state = {
    profile: {},
    projectIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const projectId = this.props.match.params.projectId;

    if (projectId) this.setState({ projectIdParam: projectId });

    this.props.getUserData(handle);
    axios
        .get(`/user/${handle}`)
        .then((res) => {
          this.setState({
            profile: res.data.user
        });
        })
        .catch((err) => console.log(err));
  }
  render() {


    const { projects, loading } = this.props.data;
    const { projectIdParam } = this.state;

    const projectCards = loading ? (
        null
    ) : projects === null ? (
        <p>No se encontraron proyectos para este usuario</p>
    ) : !projectIdParam ? (
        projects.map((project) => <CardProject feed={false} key={project.projectId} project={project} />)
    ) : (
        projects.map((project) => {
          if (project.projectId !== projectIdParam)
            return <CardProject feed={false} key={project.projectId} project={project} />;
          else return <CardProject feed={false} key={project.projectId} project={project} openDialog />;
        })
    );

    return (
      <>
        <Sidebar
            {...this.props}
            routes={routes}
            logo={{
              innerLink: "/admin/index",
              imgSrc: require("assets/img/brand/argon-react.png"),
              imgAlt: "..."
            }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
              {...this.props}
          />
        <UserPageHeader user={this.state.profile.userHandle}/>
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
                          src={this.state.profile.imageUrl}
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
                  {/*<Row>
                    <input className="" type="file" hidden="hidden" id="imageInput" onChange={this.handleImageChange}/>


                    <div className="col">
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
                    </div>
                  </Row>*/}
                  <div className="text-center">
                    <br/>
                    <br/>
                    <br/>
                    <h3>
                      @{this.state.profile.userHandle}
                      {/*<span className="font-weight-light">, 27</span>*/}
                    </h3>
                    {this.state.profile.ciudad && this.state.profile.pais && (
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.profile.ciudad}, {this.state.profile.pais}
                    </div>
                    )}

                    {this.state.profile.nombre && this.state.profile.apellido && (
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {this.state.profile.nombre} {" "} {this.state.profile.apellido}
                    </div>
                    )}
                    <div>
                      <i className="ni education_hat mr-2" />
                      {this.state.profile.email}
                    </div>
                    <hr className="my-4" />
                  </div>
                  <ProjectDialog image={this.state.profile.imageUrl} openDialog={this.props.openDialog}/>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Proyectos realizados</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    { projectCards }
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        </div>
      </>
    );
  }
}

UserPage.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user
});

export default connect(mapStateToProps, {getUserData})(UserPage);
