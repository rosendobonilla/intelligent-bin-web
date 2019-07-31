import firebase from "../../Firebase/firebaseConfig";
import {
    SET_PROJECTS
} from '../../types';

//const databaseRef = firebase.database().ref();
const db = firebase.firestore();
// this is to get the stat-cards table from firebase
//const statCardsRef = databaseRef.child("stat-cards");

const getProjects = () => (dispatch) =>{
    //console.log("User handle in actual state: " + getState().user.credentials.userHandle);

    db.collection("Projects")
            .orderBy("createdAt", "desc")
            .onSnapshot(function (querySnapshot) {
                let projects = [];
                querySnapshot.forEach((doc) => {
                    projects.push({
                        projectId: doc.id,
                        userHandle: doc.data().userHandle,
                        title: doc.data().title,
                        description: doc.data().description,
                        urlContent: doc.data().urlContent,
                        createdAt: doc.data().createdAt,
                        userImage: doc.data().userImage,
                        commentCount: doc.data().commentCount,
                        likeCount: doc.data().likeCount,
                        necessaryTrash: doc.data().necessaryTrash
                    });
                });

                dispatch({
                    type: SET_PROJECTS,
                    payload: projects
                });
            });

};



export default getProjects();
