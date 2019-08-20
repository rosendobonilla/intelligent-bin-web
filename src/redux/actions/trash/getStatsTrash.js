import firebase from "../../Firebase/firebaseConfig";
import {
    SET_STATS_TRASH
} from '../../types';
import axios from "axios";

//const databaseRef = firebase.database().ref();
const db = firebase.firestore();
// this is to get the stat-cards table from firebase
//const statCardsRef = databaseRef.child("stat-cards");


const getStatsTrash = () => (dispatch) => {
        // here we'll make a call to our database (firebase)
        // that will retrieve all of our stat cards
        // this function will get all the entires of the
        // stat-cards table, in a json format


    axios
        .post('/user/userHandle')
        .then((res) => {
            db.collection("Stats").doc(res.data.userHandle)
                .onSnapshot(function(doc) {
                    let statTrash = [];
                    statTrash.push({
                        organica: doc.data().organica,
                        aluminio: doc.data().aluminio,
                        papel: doc.data().papel,
                        //vidrio: doc.data().vidrio,
                        plastico: doc.data().plastico,
                        total: doc.data().total
                    });
                    dispatch({
                        type: SET_STATS_TRASH,
                        // if the json returns null, i.e. the
                        // stat-cards table is blank - empty
                        // then we'll return an empty object
                        payload: statTrash
                    });

                });
        })
        .catch((err) => console.log(err));

        //Error era que utilizaba const global en lugar de var local
        /*db.collection("Stats")
            .where("")
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

            });*/


};



export default getStatsTrash();
