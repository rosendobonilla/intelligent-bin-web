import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from "prop-types";
import {Col, Row} from "reactstrap";
import Tooltip from '@material-ui/core/Tooltip';
import { extendObservable } from 'mobx';
import { observer }  from 'mobx-react';

const styles = () => ({
    card: {
        width: 100,
        height: 60,
    },
    media: {
        height: 140,
    },
});

class UserCard extends React.Component {

    constructor() {
        super();

        extendObservable(this, {
            textTooltip: null
        })
    }

    state = {
        tooltipText: null
    };

    componentDidMount() {
        //console.log("Proyectos en usercard: " + this.props.user.totalProjects);
        //this.setState({ tooltipText:   "@" +this.props.user.userId + " ha realizado " + this.props.user.totalProjects + " proyectos de reciclaje." });
        this.textTooltip =  "@" +this.props.user.userId + " ha realizado " + this.props.user.totalProjects + " proyectos de reciclaje.";
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log("usercard updated: " + this.props.user.totalProjects);
        this.textTooltip =  "@" +this.props.user.userId + " ha realizado " + this.props.user.totalProjects + " proyectos de reciclaje.";
    }

    render() {

        const {
            user
        } = this.props;

        return (
            <>
            <Col lg="4" xl="4" className="mt-7 mb-9">
                <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                        <Tooltip title={this.textTooltip} placement="bottom">

                        <div className="card-profile-image">
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={user.imageUrl}
                                />
                            </a>
                        </div>
                        </Tooltip>
                    </Col>
                </Row>
            </Col>
            </>
        );
    }
}

UserCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default (withStyles(styles)(observer(UserCard)));
