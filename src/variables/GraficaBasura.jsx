import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Row
} from "reactstrap";

import CardHeader from "reactstrap/es/CardHeader";
import {Bar} from "react-chartjs-2";
import { connect } from "react-redux";

class GraficaBasura extends Component{

    state = {
        data: {},
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            callback: function (value) {
                                if (!(value % 1)) {
                                    //return '$' + value + 'k'
                                    return value;
                                }
                            }
                        }
                    }
                ]
            }
        }
    };

    componentDidMount() {
        const data = {
                labels: ["Organica", "Plástico", "Papel", "Aluminio", "Vidrio"],
                datasets: [
                    {
                        label: "Cantidad",
                        data: [this.props.datos.organica, this.props.datos.plastico, this.props.datos.papel, this.props.datos.aluminio, this.props.datos.vidrio]
                    }
                ]
        };

        this.setState({ data: data });
    }

    componentWillReceiveProps(nextProps) {
        //console.log("Datos will receive: " + nextProps.datos.organica);
        const data = {
            labels: ["Organica", "Plástico", "Papel", "Aluminio", "Vidrio"],
            datasets: [
                {
                    label: "Cantidad",
                    data: [nextProps.datos.organica, nextProps.datos.plastico, nextProps.datos.papel, nextProps.datos.aluminio, nextProps.datos.vidrio]
                }
            ]
        };

        this.setState({ data: data });
    }


    render(){

        return(
            <>
                <Card className="shadow">
                    <CardHeader className="bg-transparent">
                        <Row className="align-items-center">
                            <div className="col">
                                <h6 className="text-uppercase text-muted ls-1 mb-1">
                                    Totales
                                </h6>
                                <h2 className="mb-0">Mi basura actual</h2>
                            </div>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {/* Chart */}
                        <div className="chart">

                            <Bar
                                data={this.state.data}
                                options={this.state.options}
                            />
                            {/*<Line
                                data={this.state.data}
                                options={this.state.options}
                                getDatasetAtEvent={e => console.log(e)}
                            />*/}
                        </div>
                    </CardBody>
                </Card>
            </>
        )
    }

}

const mapToStateToProps = state => ({
   ...state
});

export default connect(mapToStateToProps)(GraficaBasura);