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
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Redux stuff
import { connect } from 'react-redux';
import {Row} from "reactstrap";
//import { getProject, clearErrors } from '../../redux/actions/dataActions';
import CardDefaultProject from '../../components/Projects/CardDefaultProject';

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
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%',
        bottom: -15
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});

class DefaultProjectsDialog extends Component {
    state = {
        open: false
    };

    componentDidMount() {
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
        //this.props.clearErrors();
    };


    render() {
        const {
            classes,
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <>

                    {
                        this.props.projects &&
                        this.props.projects.organic &&
                        this.props.projects.organic.map((prop, key) => {
                            return (
                                <Grid>
{/*                                    <Grid container spacing={16}>
                                        <Row className="mb-2">
                                            <div className="col">
                                            <span className="h2 font-weight-bold text-blue">
                                            Proyectos con material orgánico
                                            </span>
                                            </div>
                                        </Row>

                                    </Grid>*/}
                                <CardDefaultProject project={prop}/>
                                </Grid>
                            );
                        })}

                {// we first verify if the statCardState is undefined
                    this.props.projects &&
                    // then verify if the statCardState.statCardState is
                    // populated with cards from our firebase
                    this.props.projects.aluminium &&
                    // and lastly, we render them using the map function
                    this.props.projects.aluminium.map((prop, key) => {
                        return (
                            <Grid>

                                <CardDefaultProject project={prop}/>
                            </Grid>
                        );
                    })}

                {// we first verify if the statCardState is undefined
                    this.props.projects &&
                    // then verify if the statCardState.statCardState is
                    // populated with cards from our firebase
                    this.props.projects.paper &&
                    // and lastly, we render them using the map function
                    this.props.projects.paper.map((prop, key) => {
                        return (
                            <Grid>

                                <CardDefaultProject project={prop}/>
                            </Grid>
                        );
                    })}

                {// we first verify if the statCardState is undefined
                    this.props.projects &&
                    // then verify if the statCardState.statCardState is
                    // populated with cards from our firebase
                    this.props.projects.glass &&
                    // and lastly, we render them using the map function
                    this.props.projects.glass.map((prop, key) => {
                        return (
                            <Grid>

                                <CardDefaultProject project={prop}/>
                            </Grid>
                        );
                    })}

                {// we first verify if the statCardState is undefined
                    this.props.projects &&
                    // then verify if the statCardState.statCardState is
                    // populated with cards from our firebase
                    this.props.projects.pet &&
                    // and lastly, we render them using the map function
                    this.props.projects.pet.map((prop, key) => {
                        return (
                            <Grid>

                                <CardDefaultProject project={prop}/>
                            </Grid>
                        );
                    })}
            </>
        );
        return (
            <Fragment>
                <MyButton
                    onClick={this.handleOpen}
                    tip="Ver más"
                    tipClassName={classes.expandButton}
                >


                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="md"
                >
{/*                    <MyButton
                        tip="Cerrar"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>*/}
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

DefaultProjectsDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    project: state.data.project,
    UI: state.UI
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(DefaultProjectsDialog));