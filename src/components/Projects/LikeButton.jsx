import React, { Component } from 'react';
import Boton from './Boton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';

import {likeProject, unlikeProject} from "../../redux/actions/dataActions";

export class LikeButton extends Component {



    likedProject = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.projectId === this.props.projectId
            )
        )
            return true;
        else return false;
    };

    likeProject = () => {
        this.props.likeProject(this.props.projectId);
    };
    unlikeProject = () => {
        this.props.unlikeProject(this.props.projectId);
    };
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/auth/login">
                <Boton tip="Like">
                    <FavoriteBorder color="primary" />
                </Boton>
            </Link>
        ) : this.likedProject() ? (
            <Boton tip="Unlike" onClick={this.unlikeProject}>
                <FavoriteIcon color="primary" />
            </Boton>
        ) : (
            <Boton tip="Like" onClick={this.likeProject}>
                <FavoriteBorder color="primary" />
            </Boton>
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired,
    likeProject: PropTypes.func.isRequired,
    unlikeProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeProject,
    unlikeProject
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(LikeButton);