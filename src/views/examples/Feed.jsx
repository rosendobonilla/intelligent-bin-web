import React from "react";
// react component that copies the given text inside your clipboard
//import { CopyToClipboard } from "react-copy-to-clipboard";

import CardProject from 'components/Projects/CardProject';

import { connect } from "react-redux";
import getProjects from "../../redux/actions/projects/getProjectsAction";
import {Container} from "reactstrap";

class Feed extends React.Component {

  componentDidMount() {
      this.props.getProjects();
  }


    render() {

      return (
      <>

          <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
              <Container fluid>
                  <div className="header-body">

              {// we first verify if the statCardState is undefined
                  this.props.data &&
                  // then verify if the statCardState.statCardState is
                  // populated with cards from our firebase
                  this.props.data.projects &&
                  // and lastly, we render them using the map function
                  this.props.data.projects.map((prop, key) => {
                          return (
                              <CardProject feed={true} key={prop.projectId} project={prop}/>

                          );
              })}

          </div>



      </Container>
          </div>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
    ...state
});

const mapDispatchToProps = dispatch => {
    return{
        getProjects: () => dispatch(getProjects)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Feed);

//Problem 404 bad response because a serviceWorker
//navigator.serviceWorker.getRegistrations().then(function(registrations) { for(let registration of registrations) { registration.unregister() } })

//TODO: verificar por que no muestra las card del ranking
//TODO: recomendaciones de proyectos en tiempo real setState
