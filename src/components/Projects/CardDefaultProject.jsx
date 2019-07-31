import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Row,
    CardTitle,
    Col, Button
} from "reactstrap";

import CardHeader from "reactstrap/es/CardHeader";
import '../../assets/css/custom_styles.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; //Para utilizar el idioma español
import relativeTime from 'dayjs/plugin/relativeTime';
import { withRouter } from 'react-router-dom';


import { createProject, updateTrashStats } from "../../redux/actions/dataActions";
import { connect } from "react-redux";
import IframeDialog from "../../components/Projects/IframeDialog";

class CardDefaultProject extends Component{

    iniciarProyecto = (projectId) => {
        if(this.props.project.projectId === projectId){
            const newProject = {
                title: this.props.project.title,
                description: this.props.project.description,
                urlContent: this.props.project.urlContent,
                necessaryTrash: this.props.project.necessaryTrash,
                trashType: this.props.project.trashType,
                complexity: this.props.project.complexity
            };

            const newData = {
                type: this.props.project.trashType,
                cantidad: this.props.project.necessaryTrash
            };

            const dataRecycling = {
                trashType: this.props.project.trashType,
                quantityRecycled: this.props.project.necessaryTrash
            };

            this.props.createProject(newProject);
            this.props.updateTrashStats(newData, dataRecycling, this.props.history);
        }
    };

    render(){
        dayjs.locale('es')
        dayjs.extend(relativeTime);

        const {
            project : {
                projectId,
                complexity,
                title,
                description,
                urlContent,
                trashType,
                necessaryTrash
            }
        } = this.props;

        const { history } = this.props;

        return(
            (history)
            ? (
            <Col className="mb-2">
                <Card className="card-stats mb-4 mb-xl-0 bg-lighter">

                    <CardHeader
                        tag="h5"
                        className="text-uppercase mb-0 bg-light"

                    >
                        <Row>
                            <Col className="col-11">
                                <CardTitle
                                    tag="h5"
                                    className="text-uppercase mb-0"
                                >
                                    Proyecto: {title}

                                </CardTitle>

                            </Col>
                            <Col className="col-1">

                            <Button
                                color="primary"
                                href="#pablo"
                                onClick={() => this.iniciarProyecto(projectId)}
                                size="sm"
                            >
                                Iniciar
                            </Button>
                            </Col>

                        </Row>
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <div className="col">
                                    <span className="h5 text-uppercase font-weight-bold text-success">
                                    Dificultad: {complexity}
                                    </span>
                                <span className="h4 font-weight-bold ml-3 text-danger">
                                    ¡Reciclarás {necessaryTrash} unidades de basura!
                                    </span>
                                <span className="h4 text-uppercase font-weight-bold ml-3 text-blue">
                                    Tipo de basura a reciclar:
                                    <span className="h4 text-uppercase font-weight-bold ml-3 text-warning">
                                    {trashType}
                                    </span>
                                </span>

                            </div>

                        </Row>
                        <Row>
                            <div className="col">

                                <span className="h2 font-weight-bold mb-0">
                            {description}
                          </span>

                            </div>

                        </Row>
                        <Row className="mt-2 ml-1 mb-0">
                            <IframeDialog url={urlContent}/>
                            <p className="h4" >Más información en:</p> <p className="h4 ml-5" >o visita</p> <a className="ml-1" target="_blank" rel="noopener noreferrer" href={urlContent}>  {urlContent} </a>

                        </Row>
                    </CardBody>
                </Card>
            </Col>
                ): (<div>Cargando...</div>)
        )
    }

}


//WithRouter, componente de alto orden para tener acceso directamente al history.push
export default withRouter(connect(null, { createProject, updateTrashStats })(CardDefaultProject));