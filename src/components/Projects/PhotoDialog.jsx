import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from './Boton';

// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
// Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';
// Redux stuff
import { connect } from 'react-redux';
import { getProject, clearErrors } from '../../redux/actions/dataActions';

const styles = () => ({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    },
    typography: {
        useNextVariants: true
    },
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00bcd4'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    profileImage: {
        maxWidth: 1000,
        maxHeight: 600,
        borderRadius: '0%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 0,
        width: 1000,
        height: 600
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {

    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});

class PhotoDialog extends Component {
    state = {
        open: false
    };
    componentDidMount() {
        console.log(this.props);
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
        //this.props.getProject(this.props.projectId);
    };
    handleClose = () => {
        this.setState({ open: false });
        this.props.clearErrors();
    };

    render() {

        const {
            classes,
            UI: { loading },
        } = this.props;


        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={10}>
                <Grid item md={10} >
                    <img src={this.props.image} alt="Profile" className={classes.profileImage}/>
                </Grid>
            </Grid>
        );
        return (
            <Fragment>
                <MyButton
                    onClick={this.handleOpen}
                    tip="Mostrar más"
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    className={classes.dialogContent}
                >
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

PhotoDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getProject: PropTypes.func.isRequired,
    projectId: PropTypes.string.isRequired,
    project: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    project: state.data.project,
    UI: state.UI,
});

const mapActionsToProps = {
    getProject,
    clearErrors
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(PhotoDialog));