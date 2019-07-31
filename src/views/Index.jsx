import React from "react";
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from "chart.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.jsx";

import Header from "components/Headers/Header.jsx";
import {connect} from "react-redux";
import GraficaBasura from "../variables/GraficaBasura";
import GraficaTotales from "../variables/GraficaTotales";
import GraficaReciclado from "../variables/GraficaReciclado";

import getUserRecycling from "../redux/actions/trash/getUserRecycling";
import getDefaultProjects from "../redux/actions/projects/getDefaultProjectsAction";
import getStatsTrash from "../redux/actions/trash/getStatsTrash";
import getRankingUsers from "../redux/actions/user/getRankingUsers";

class Index extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1",
  };

  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  componentDidMount() {
    this.props.getUserRecycling();
    this.props.getDefaultProjects();
    this.props.getStatsTrash();
    this.props.getRankingUsers();
  }

  render() {


    /*    const graficaBarras = !this.props.user.loading ? (
            <Bar
                data={chartExample2.data}
                options={chartExample2.options}
            />
        ): null;*/

    const header = !this.props.user.loading && this.props.data.defaultProjects && this.props.trash.trash && this.props.trash.rankingUsers ? (
        <Header history={this.props.history} defaultProjects={this.props.data.defaultProjects} trash={this.props.trash.trash} rankingUsers={this.props.trash.rankingUsers}/>
    ): null;

    return (
      <>
        {header}
        {/* Page content */}
        <Container className="mt--8" fluid>
          <Row className="mb-5">
            <Col lg="12" xl="12">
              {this.props.trash && this.props.trash.trash &&
              // and lastly, we render them using the map function
              this.props.trash.trash.map((prop, key) => {
                return (
                  <GraficaBasura datos={prop} key={key}/>
                );
              })}
            </Col>
          </Row>
          <Row>
            {/* Chart reciclado */}
            {this.props.trash && this.props.trash.userRecycling &&
            // and lastly, we render them using the map function
            this.props.trash.userRecycling.map((prop, key) => {
              return (
                  <GraficaReciclado datos={prop} key={key}/>
              );
            })}

            {/* Chart totales*/}
            <Col xl="4">

                    {this.props.trash && this.props.trash.trashTotals &&
                    // and lastly, we render them using the map function
                    this.props.trash.trashTotals.map((prop, key) => {
                      return (
                          <GraficaTotales datos={prop} key={key}/>
                      );
                    })}

            </Col>
          </Row>
{/*          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Page visits</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Page name</th>
                      <th scope="col">Visitors</th>
                      <th scope="col">Unique users</th>
                      <th scope="col">Bounce rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">/argon/</th>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/index.html</th>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/charts.html</th>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/tables.html</th>
                      <td>2,050</td>
                      <td>147</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/profile.html</th>
                      <td>1,795</td>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>*/}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getUserRecycling: () => dispatch(getUserRecycling),
  getDefaultProjects: () => dispatch(getDefaultProjects),
  getStatsTrash: () => dispatch(getStatsTrash),
  getRankingUsers: () => dispatch(getRankingUsers)

});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
