import firebase from "../../Firebase/firebaseConfig";
import {
    SET_TOTAL_TRASH
} from '../../types';

//const databaseRef = firebase.database().ref();
const db = firebase.firestore();
// this is to get the stat-cards table from firebase
//const statCardsRef = databaseRef.child("stat-cards");
const docRef = db.collection("Trash");

const getTotalTrash = () => (dispatch) => {
        // here we'll make a call to our database (firebase)
        // that will retrieve all of our stat cards
        // this function will get all the entires of the
        // stat-cards table, in a json format

    //console.log(getState());
        //Error era que utilizaba const global en lugar de var local
        docRef
            .onSnapshot(function (querySnapshot) {
                let snap = [];
                let count = 0;
                querySnapshot.forEach(function (doc) {
                    //console.log(doc.data());
                    snap.push(doc.data());
                    count++;
                });
                dispatch({
                    type: SET_TOTAL_TRASH,
                    // if the json returns null, i.e. the
                    // stat-cards table is blank - empty
                    // then we'll return an empty object
                    payload: {"total": count}
                });

            });

};

export default getTotalTrash();
