import firebase from "../../Firebase/firebaseConfig";
import {
    SET_NOTIFICATIONS, SET_PROJECTS
} from '../../types';

//const databaseRef = firebase.database().ref();
const db = firebase.firestore();
// this is to get the stat-cards table from firebase
//const statCardsRef = databaseRef.child("stat-cards");
const docRef = db.collection("Projects");



const getUserNotifications = () => (dispatch, getState) => {

    const user = getState().user.credentials.userHandle;
    if(user) {
        let notifications = [];
        db.collection("Notifications")
            .where("recipient", "==", user)
            .orderBy('createdAt', 'desc')
            .limit(20)
            .onSnapshot(function(querySnapshot) {

                querySnapshot.forEach(function(doc) {
                    notifications.push({
                        projectId: doc.id,
                        recipient: doc.data().recipient,
                        sender: doc.data().sender,
                        read: doc.data().read,
                        createdAt: doc.data().createdAt,
                        type: doc.data().type,

                    });
                });
            });
        dispatch({
            type: SET_NOTIFICATIONS,
            payload: notifications
        });
    }
};



export default getUserNotifications();
