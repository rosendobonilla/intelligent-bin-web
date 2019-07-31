import firebase from "../../Firebase/firebaseConfig";
import {
    SET_DEFAULT_PROJECTS
} from '../../types';

//const databaseRef = firebase.database().ref();
const db = firebase.firestore();
// this is to get the stat-cards table from firebase
//const statCardsRef = databaseRef.child("stat-cards");

const getDefaultProjects = () => (dispatch) =>{
    db.collection("Projects-default")
            .onSnapshot(function (querySnapshot) {
                let defaultProjects = [];
                querySnapshot.forEach((doc) => {
                    defaultProjects.push({
                        projectId: doc.id,
                        title: doc.data().title,
                        description: doc.data().description,
                        urlContent: doc.data().urlContent,
                        trashType: doc.data().trashType,
                        necessaryTrash: doc.data().necessaryTrash,
                        complexity: doc.data().complexity,
                    });
                });
                dispatch({
                    type: SET_DEFAULT_PROJECTS,
                    payload: defaultProjects
                });
            });

};



export default getDefaultProjects();
