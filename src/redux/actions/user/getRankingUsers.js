import firebase from "../../Firebase/firebaseConfig";
import {
    SET_RANKING_USERS
} from '../../types';

//const databaseRef = firebase.database().ref();
const db = firebase.firestore();
// this is to get the stat-cards table from firebase
//const statCardsRef = databaseRef.child("stat-cards");
const getRankingUsers = () => (dispatch) => {


    db.collection("Users")
        .orderBy("totalProjects", "desc")
        .limit(3)
        .onSnapshot(function (querySnapshot) {
            let usuarios = [];

            querySnapshot.forEach((doc) => {
                usuarios.push({
                    userId: doc.id,
                    apellido: doc.data().apellido,
                    ciudad: doc.data().ciudad,
                    cp: doc.data().cp,
                    direccion: doc.data().direccion,
                    createdAt: doc.data().createdAt,
                    email: doc.data().email,
                    imageUrl: doc.data().imageUrl,
                    nombre: doc.data().nombre,
                    pais: doc.data().pais,
                    userHandle: doc.data().userHandle,
                    totalProjects: doc.data().totalProjects
                });
            });

            dispatch({
                type: SET_RANKING_USERS,
                payload: usuarios
            });
        });


};


export default getRankingUsers();
