import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Col,
    Row
} from "reactstrap";

import CardHeader from "reactstrap/es/CardHeader";
import {Line} from "react-chartjs-2";
import { connect } from "react-redux";

import {
    chartOptions,
    parseOptions
} from "../variables/charts.jsx";

import Chart from "chart.js";

// Colors
var colors = {
    gray: {
        100: "#f6f9fc",
        200: "#e9ecef",
        300: "#dee2e6",
        400: "#ced4da",
        500: "#adb5bd",
        600: "#8898aa",
        700: "#525f7f",
        800: "#32325d",
        900: "#212529"
    },
    theme: {
        default: "#172b4d",
        primary: "#5e72e4",
        secondary: "#f4f5f7",
        info: "#11cdef",
        success: "#2dce89",
        danger: "#f5365c",
        warning: "#fb6340"
    },
    black: "#12263F",
    white: "#FFFFFF",
    transparent: "transparent"
};

class GraficaReciclado extends Component{

    state = {
        activeNav: 1,
        chartExample1Data: "data1",
        chartExample1: {}
    };

    componentWillMount() {
        if (window.Chart) {
            parseOptions(Chart, chartOptions());
        }
    }

    componentDidMount() {

        this.setState({
            chartExample1: {options: {
            scales: {
                yAxes: [
                    {
                        gridLines: {
                            color: colors.gray[900],
                            zeroLineColor: colors.gray[900]
                        },
                        ticks: {
                            callback: function(value) {
                                if (!(value % 1)) {
                                    //return "$" + value + "k";
                                    return value;
                                }
                            }
                        }
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    label: function(item, data) {
                        var label = data.datasets[item.datasetIndex].label || "";
                        var yLabel = item.yLabel;
                        var content = "";

                        if (data.datasets.length > 1) {
                            content += label;
                        }

                        //content += "$" + yLabel + "k";
                        content += yLabel;
                        return content;
                    }
                }
            }
        },
        data1: canvas => {
            return {
                labels: this.props.datos[1],
                datasets: [
                    {
                        label: "Cantidad",
                        data: this.props.datos[0]
                    }
                ]
            };
        },
            data2: canvas => {
            return {
                labels: ["Santel", "Rosendo", "Leo", "Yazmin", "Diana", "Luigi", "Luis", "Juan", "Valeria", "Antonio"],
                datasets: [
                    {
                        label: "Performance",
                        data: [0, 20, 5, 25, 10, 30, 15, 40, 40,5]
                    }
                ]
            };
        }
            }
        });
    }

    render(){

        return(
            <>
                <Col className="mb-5 mb-xl-0" xl="8">
                    <Card className="bg-gradient-default shadow">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h6 className="text-uppercase text-light ls-1 mb-1">
                                        Material reciclado
                                    </h6>
                                    <h2 className="text-white mb-0">Totales por mes (en unidades)</h2>
                                </div>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {/* Chart */}
                            <div className="chart">
                                <Line
                                    data={this.state.chartExample1[this.state.chartExample1Data]}
                                    options={this.state.chartExample1.options}
                                    getDatasetAtEvent={e => console.log(e)}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </>
        )
    }

}

const mapToStateToProps = state => ({
   ...state
});

export default connect(mapToStateToProps)(GraficaReciclado);