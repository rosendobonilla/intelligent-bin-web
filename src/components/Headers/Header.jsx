import React from "react";

// reactstrap components
import {Card, CardBody, CardTitle, Container, Row, Col} from "reactstrap";

import getStatsTrash from "../../redux/actions/trash/getStatsTrash";
import getUserTrashTotals from "../../redux/actions/trash/getUserTrashTotals";
import getDefaultProjects from "../../redux/actions/projects/getDefaultProjectsAction";
//import getRankingUsers from "../../redux/actions/user/getRankingUsers";


import { connect } from "react-redux";
import org from '../../assets/img/misc/org.png';
import al from '../../assets/img/misc/al.png';
import paper from '../../assets/img/misc/paper.png';
import pet from '../../assets/img/misc/pet.png';
import glass from '../../assets/img/misc/glass.png';


//mobx stuff
import { extendObservable } from 'mobx';
import { observer }  from 'mobx-react';

import {
  chartOptions,
  parseOptions,
} from "../../variables/charts.jsx";
import Chart from "chart.js";

import DefaultProjectsDialog from '../../components/Projects/DefaultProjectsDialog';

import UserCard from "../Users/UserCard";

class Header extends React.Component {

  constructor() {
    super();

    extendObservable(this, {
      rankingCards: null
    })
  }

  state = {
    cardProyectosState: null
  };

  componentDidMount() {
    //this.props.getDefaultProjects();
    this.props.getUserTrashTotals();
    //this.props.getRankingUsers();


    let users = [];
    if(this.props.rankingUsers) {
      for (let x = 0; x < this.props.rankingUsers.length; x++) {
          users.push(this.props.rankingUsers[x]);
      }
      if(this.rankingCards === null) {
        this.rankingCards = users;
      }
    }


    //Obtener proyectos la primera vez cuando se monta el componente

    let organicProjects = [];
    let alProjects = [];
    let paperProjects = [];
    let glassProjects = [];
    let petProjects = [];
    let totalProyectosSugerencias = 0;
    let todos = {
      organic: null,
      aluminium: null,
      paper: null,
      glass: null,
      pet: null
    };

    if(this.props.defaultProjects && this.props.trash){
      //console.log("antes: " + prevProps.data.defaultProjects[0].necessaryTrash);
      //console.log("ahora: " + this.props.data.defaultProjects[0].necessaryTrash);
      for (let x = 0; x < this.props.defaultProjects.length; x++){
        if(this.props.defaultProjects[x].trashType === "organica"){
          if(this.props.trash.trash[0].organica >= this.props.defaultProjects[x].necessaryTrash){
            organicProjects.push(this.props.defaultProjects[x]);
            totalProyectosSugerencias++;
          }
        }
        if(this.props.defaultProjects[x].trashType === "aluminio"){
          if(this.props.trash.trash[0].aluminio >= this.props.defaultProjects[x].necessaryTrash){
            alProjects.push(this.props.defaultProjects[x]);
            totalProyectosSugerencias++;
          }
        }
        if(this.props.defaultProjects[x].trashType === "papel"){
          if(this.props.trash.trash[0].papel >= this.props.defaultProjects[x].necessaryTrash){
            paperProjects.push(this.props.defaultProjects[x]);
            totalProyectosSugerencias++;
          }
        }
        if(this.props.defaultProjects[x].trashType === "vidrio"){
          if(this.props.trash.trash[0].vidrio >= this.props.defaultProjects[x].necessaryTrash){
            glassProjects.push(this.props.defaultProjects[x]);
            totalProyectosSugerencias++;
          }
        }
        if(this.props.defaultProjects[x].trashType === "plastico"){
          if(this.props.trash.trash[0].plastico >= this.props.defaultProjects[x].necessaryTrash){
            petProjects.push(this.props.data.defaultProjects[x]);
            totalProyectosSugerencias++;
          }
        }

        todos["organic"] = organicProjects;
        todos["aluminium"] = alProjects;
        todos["paper"] = paperProjects;
        todos["glass"] = glassProjects;
        todos["pet"] = petProjects;

        if(organicProjects.length > 0 || alProjects.length > 0 || paperProjects.length > 0 || glassProjects.length > 0 || petProjects.length > 0 ){
          if(this.state.cardProyectosState === null) {
            this.setState({ cardProyectosState: <Row className="mb-3">
                <Col lg="12" xl="12">
                  <Card className="card-stats mb-4 mb-xl-0 bg-translucent-neutral">
                    <CardBody>
                      <Row>
                          <CardTitle
                              tag="h5"
                              className="mb-0 text-danger"
                          >
                            TIP: Con base en la cantidad de basura en tu contenedor, te recomendamos considerar los siguientes proyectos de reciclaje.
                          </CardTitle>
                        <div className="col-auto">
                          <CardTitle
                              tag="h5"
                              className="mb-0 text-dark"
                          >
                            Ver {totalProyectosSugerencias} proyectos
                            <DefaultProjectsDialog projects={todos} openDialog={this.props.openDialog}/>

                          </CardTitle>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>});
          }
        }

      }

    }
  }

  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {


    let organicProjects = [];
    let alProjects = [];
    let paperProjects = [];
    let glassProjects = [];
    let petProjects = [];
    let totalProyectosSugerencias = 0;
    let todos = {
      organic: null,
      aluminium: null,
      paper: null,
      glass: null,
      pet: null
    };

    let users = [];
    if(this.props.rankingUsers) {
      //console.log("ranking antes: " + prevProps.trash.rankingUsers[0].totalProjects);
      //console.log("ranking ahora: " + this.props.rankingUsers[0].totalProjects);
      for (let x = 0; x < this.props.rankingUsers.length; x++) {
          users.push(this.props.rankingUsers[x]);
      }
      if(this.rankingCards === null || prevProps.trash.rankingUsers !== this.props.rankingUsers) {
          //console.log("diferentes: " + users[0].totalProjects);
          this.rankingCards = users;
          //console.log("ranking cards in state: " + this.rankingCards[0].totalProjects);

      }
    }

    if(this.props.defaultProjects && this.props.trash && this.props.trash.trash){
      //console.log("antes: " + prevProps.data.defaultProjects[0].necessaryTrash);
      //console.log("ahora: " + this.props.data.defaultProjects[0].necessaryTrash);
      for (let x = 0; x < this.props.defaultProjects.length; x++){
        if(this.props.defaultProjects[x].trashType === "organica"){
          if(this.props.trash.trash[0].organica >= this.props.defaultProjects[x].necessaryTrash){
            organicProjects.push(this.props.defaultProjects[x]);
            totalProyectosSugerencias++;
          }
        }
        if(this.props.defaultProjects[x].trashType === "aluminio"){
          if(this.props.trash.trash[0].aluminio >= this.props.defaultProjects[x].necessaryTrash){
            alProjects.push(this.props.defaultProjects[x]);
            totalProyectosSugerencias++;
          }
        }
        if(this.props.defaultProjects[x].trashType === "papel"){
          if(this.props.trash.trash[0].papel >= this.props.defaultProjects[x].necessaryTrash){
            paperProjects.push(this.props.defaultProjects[x]);
            totalProyectosSugerencias++;
          }
        }
        if(this.props.defaultProjects[x].trashType === "vidrio"){
          if(this.props.trash.trash[0].vidrio >= this.props.defaultProjects[x].necessaryTrash){
            glassProjects.push(this.props.defaultProjects[x]);
            totalProyectosSugerencias++;
          }
        }
        if(this.props.defaultProjects[x].trashType === "plastico"){
          if(this.props.trash.trash[0].plastico >= this.props.defaultProjects[x].necessaryTrash){
            petProjects.push(this.props.data.defaultProjects[x]);
            totalProyectosSugerencias++;
          }
        }

        todos["organic"] = organicProjects;
        todos["aluminium"] = alProjects;
        todos["paper"] = paperProjects;
        todos["glass"] = glassProjects;
        todos["pet"] = petProjects;

        //console.log("Default projects in header updated actual: " + this.props.defaultProjects[0].necessaryTrash);
        //console.log("Default projects in header updated prevProps directly: " + prevProps.defaultProjects[0].necessaryTrash);

        if(organicProjects.length > 0 || alProjects.length > 0 || paperProjects.length > 0 || glassProjects.length > 0 || petProjects.length > 0 ){
          if(this.state.cardProyectosState === null || prevProps.data.defaultProjects !== this.props.defaultProjects) {

            this.setState({ cardProyectosState: <Row className="mb-3">
              <Col lg="12" xl="12">
                <Card className="card-stats mb-4 mb-xl-0 bg-translucent-neutral">
                  <CardBody>
                    <Row>
                        <CardTitle
                            tag="h5"
                            className="mb-0 text-danger"
                        >
                          TIP: Con base en la cantidad de basura en tu contenedor, te recomendamos considerar los siguientes proyectos de reciclaje.
                        </CardTitle>
                      <div className="col-auto">
                        <CardTitle
                            tag="h5"
                            className="mb-0 text-dark"
                        >
                          Ver {totalProyectosSugerencias} proyectos
                          <DefaultProjectsDialog projects={todos} openDialog={this.props.openDialog}/>

                        </CardTitle>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>});
          }
        }

      }

    }

  }

  render() {

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">

              {this.state.cardProyectosState}

              <Row>
                {// we first verify if the statCardState is undefined
                  this.props.trash &&
                  // then verify if the statCardState.statCardState is
                  // populated with cards from our firebase
                  this.props.trash.trash &&
                  // and lastly, we render them using the map function
                  this.props.trash.trash.map((prop, key) => {
                      return (
                          <Row key={key}>
                            <Col lg="6" xl="2" >
                              <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                  <Row>
                                    <div className="col">
                                      <CardTitle
                                          tag="h5"
                                          className="text-uppercase text-muted mb-0"
                                      >
                                        TOTAL
                                      </CardTitle>
                                      <span className="display-2 font-weight-bold mb-0">
                            {prop.total}
                          </span>
                                    </div>
                                    <Col className="col-auto">
                                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                        <i className="fas fa-chart-bar" />
                                      </div>
                                    </Col>
                                  </Row>

                                </CardBody>
                              </Card>
                            </Col>
                            <Col lg="6" xl="2">
                              <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                  <Row>
                                    <div className="col">
                                      <CardTitle
                                          tag="h5"
                                          className="text-uppercase text-muted mb-0"
                                      >
                                        ORGÁNICA
                                      </CardTitle>
                                      <span className="display-2 font-weight-bold mb-0">
                            {prop.organica}
                          </span>
                                    </div>
                                    <Col className="col-auto">
                                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                        <img src={org} alt="organica"/>
                                      </div>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col lg="6" xl="2">
                              <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                  <Row>
                                    <div className="col">
                                      <CardTitle
                                          tag="h5"
                                          className="text-uppercase text-muted mb-0"
                                      >
                                        PLASTICO
                                      </CardTitle>
                                      <span className="display-2 font-weight-bold mb-0">{prop.plastico}</span>
                                    </div>
                                    <Col className="col-auto">
                                      <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                        <img src={pet} alt="pet"/>
                                      </div>
                                    </Col>
                                  </Row>

                                </CardBody>
                              </Card>
                            </Col>
                            <Col lg="6" xl="2">
                              <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                  <Row>
                                    <div className="col">
                                      <CardTitle
                                          tag="h5"
                                          className="text-uppercase text-muted mb-0"
                                      >
                                        PAPEL
                                      </CardTitle>
                                      <span className="display-2 font-weight-bold mb-0">
                            {prop.papel}
                          </span>
                                    </div>
                                    <Col className="col-auto">
                                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                        <img src={paper} alt="papel"/>
                                      </div>
                                    </Col>
                                  </Row>

                                </CardBody>
                              </Card>
                            </Col>

                            <Col lg="6" xl="2">
                              <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                  <Row>
                                    <div className="col">
                                      <CardTitle
                                          tag="h5"
                                          className="text-uppercase text-muted mb-0"
                                      >
                                        ALUMINIO
                                      </CardTitle>
                                      <span className="display-2 font-weight-bold mb-0">
                            {prop.aluminio}
                          </span>
                                    </div>
                                    <Col className="col-auto">
                                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                        <img src={al} alt="aluminio"/>
                                      </div>
                                    </Col>
                                  </Row>

                                </CardBody>
                              </Card>
                            </Col>

                            <Col lg="6" xl="2">
                              <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                  <Row>
                                    <div className="col">
                                      <CardTitle
                                          tag="h5"
                                          className="text-uppercase text-muted mb-0"
                                      >
                                        VIDRIO
                                      </CardTitle>
                                      <span className="display-2 font-weight-bold mb-0">
                                        {prop.vidrio}
                          </span>
                                    </div>
                                    <Col className="col-auto">
                                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                        <img src={glass} alt="vidrio"/>
                                      </div>
                                    </Col>
                                  </Row>

                                </CardBody>
                              </Card>
                            </Col>


                          </Row>
                      );
                  })}


              </Row>
              {/* Cards user ranking */}

              {this.rankingCards
                  ?
                  <div className="text-center mt-5">
                    <p className="h3">Usuarios más activos (con más proyectos de reciclaje realizados)</p>
                  </div>
                  :
                  <div className="text-center mt-5">
                    <p className="h3"></p>
                  </div>
              }

              <Row className=" col-auto">
                {this.rankingCards && this.rankingCards.map((prop, key) => {
                  return (
                      <UserCard user={prop} key={key}/>
                  )
                })}
              </Row>

            </div>

          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getStatsTrash: () => dispatch(getStatsTrash),
  getUserTrashTotals: () => dispatch(getUserTrashTotals),
  getDefaultProjects: () => dispatch(getDefaultProjects),
});

export default connect(mapStateToProps, mapDispatchToProps)(observer(Header));
