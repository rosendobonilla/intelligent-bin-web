import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Row
} from "reactstrap";

import CardHeader from "reactstrap/es/CardHeader";
import {Bar} from "react-chartjs-2";
import { connect } from "react-redux";

class GraficaTotales extends Component{

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
        },
        nombres: [],
        totales: []
    };

    componentDidMount() {
        let nombres = [];
        let totales = [];

        for (let x = 0; x < this.props.datos.length; x++){
            nombres.push(this.props.datos[x].userHandle);
            totales.push(this.props.datos[x].total);
        }

        const data = {
                labels: nombres,
                datasets: [
                    {
                        label: "Cantidad",
                        data: totales
                    }
                ]
        };

        this.setState({
            data: data
        });
    }

    componentWillReceiveProps(nextProps) {
        let nombres = [];
        let totales = [];

        for (let x = 0; x < this.props.datos.length; x++){
            nombres.push(this.props.datos[x].userHandle);
            totales.push(this.props.datos[x].total);
        }

        const data = {
            labels: nombres,
            datasets: [
                {
                    label: "Cantidad",
                    data: totales
                }
            ]
        };

        this.setState({
            data: data
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.datos !== prevProps.datos){
            let noms = [];
            let tots = [];

            for (let x = 0; x < this.props.datos.length; x++){
                noms.push(this.props.datos[x].userHandle);
                tots.push(this.props.datos[x].total);
            }

            const data = {
                labels: noms,
                datasets: [
                    {
                        label: "Cantidad",
                        data: tots
                    }
                ]
            };

            this.setState({
                data: data
            });
        }
        /*console.log("refresh: " + prevState.totales);
        console.log("refresh: " + this.state.totales);
        console.log("actual props : " + this.props.datos[5].total);
        console.log("prev props : " + prevProps.datos[5].total);*/

    }

    render(){

        return(
            <>
                <Card className="shadow">
                    <CardHeader className="bg-transparent">
                        <Row className="align-items-center">
                            <div className="col">
                                <h6 className="text-uppercase text-muted ls-1 mb-1">
                                    Otros usuarios
                                </h6>
                                <h2 className="mb-0">Contenedores de basura más llenos</h2>
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

export default connect(mapToStateToProps)(GraficaTotales);