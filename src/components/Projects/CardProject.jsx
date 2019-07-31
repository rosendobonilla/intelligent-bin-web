import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Row,
    CardTitle,
    Col
} from "reactstrap";

import CardHeader from "reactstrap/es/CardHeader";
import Link from 'react-router-dom/Link';
import '../../assets/css/custom_styles.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; //Para utilizar el idioma español
import relativeTime from 'dayjs/plugin/relativeTime';

import ChatIcon from '@material-ui/icons/Chat';


import PropTypes from 'prop-types';

import Boton from './Boton';


import { connect } from "react-redux";
import { likeProject, unlikeProject } from "../../redux/actions/dataActions";

import DeleteProject from './DeleteProject';
import LikeButton from './LikeButton';
import ProjectDialog from './ProjectDialog';

class CardProject extends Component{

    render(){
        dayjs.locale('es')
        dayjs.extend(relativeTime);

        const {
            feed,
            project : {
                projectId,
                title,
                description,
                createdAt,
                urlContent,
                userHandle,
                userImage,
                likeCount,
                commentCount,
                necessaryTrash
            },
            user: {
                authenticated,
                credentials
            }
        } = this.props;


        const deleteButton = authenticated && userHandle === credentials.userHandle ? (
            <DeleteProject projectId={projectId}/>
        ) : null;

        const cardHeader = feed ? (
            <CardHeader
                tag="h5"
                className="text-uppercase mb-0"

            >
                <Row>
                    <Col className="col-1">
                        <div className="div-user-image-feed">
                            <img
                                alt="..."
                                className="rounded-circle user-image-feed"
                                src={userImage}
                            />
                        </div>

                    </Col>

                    <Col className="col-10">
                        <Link to={`/users/${userHandle}`}>@{userHandle}</Link> {" "} comenzó un proyecto.
                        <span className="h4 font-weight-bold ml-3 text-danger"> ¡Recicló {necessaryTrash} unidades de basura!</span>
                        <span className="h4 font-weight-bold ml-3 text-success"> ¡Recicla tu también!</span>
                    </Col>

                    <Col className="col-1">

                        <div className="">
                            {deleteButton}
                        </div>
                    </Col>
                </Row>
            </CardHeader>
        ) : null;

        return(
            <Col className="mb-2">
                <Card className="card-stats mb-4 mb-xl-0">

                    {cardHeader}

                    <CardBody>
                        <Row>
                            <div className="col">
                                <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                >
                                    Proyecto: {title}
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                      {description}
                          </span>

                            </div>

                        </Row>
                        <Row className="mt-2 ml-1 mb-0">
                            Más información en: <a className="ml-1" target="_blank" rel="noopener noreferrer" href={urlContent}>  {urlContent} </a>

                        </Row>
                        <Col className="col-12">
                        <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-clock" /> {dayjs(createdAt).fromNow()}
                        </span>{" "}
                            <LikeButton projectId={projectId} />
                        <span className="text-nowrap">{likeCount} likes</span>{" "}
                            <Boton tip="Comentar">
                                <ChatIcon color="primary" />
                            </Boton>
                            <span className="text-nowrap">{commentCount} comentarios</span>{"    "}
                            <span className="t">
                            <ProjectDialog projectId={projectId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                            </span>
                        </p>

                        </Col>

                    </CardBody>
                </Card>
            </Col>
        )
    }

}

CardProject.propTypes = {
    likeProject: PropTypes.func.isRequired,
    unlikeProject: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps, {likeProject, unlikeProject})(CardProject);