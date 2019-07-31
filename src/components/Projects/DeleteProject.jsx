import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Boton from './Boton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteProject } from "../../redux/actions/dataActions";

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
};

class DeleteProject extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    deleteProject = () => {
        this.props.deleteProject(this.props.projectId);
        this.setState({ open: false });
    };
    render() {
        return (
            <Fragment>
                <Boton
                    tip="Eliminar proyecto"
                    onClick={this.handleOpen}
                >
                    <DeleteOutline color="secondary" />
                </Boton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        ¿Esta seguro de eliminar este proyecto?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.deleteProject} color="secondary">
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

DeleteProject.propTypes = {
    deleteProject: PropTypes.func.isRequired,
    projectId: PropTypes.string.isRequired
};

export default connect(
    null,
    { deleteProject }
)(withStyles(styles)(DeleteProject));