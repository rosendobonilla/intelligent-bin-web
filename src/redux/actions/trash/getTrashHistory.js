import firebase from "../../Firebase/firebaseConfig";
import {
    SET_TRASH_HISTORY
} from '../../types';
import store from '../../../redux/store';

//const databaseRef = firebase.database().ref();
const db = firebase.firestore();
// this is to get the stat-cards table from firebase
//const statCardsRef = databaseRef.child("stat-cards");

let datos = [];

const getTrashHistory = () => (dispatch, getState) => {

    const userHandle = store.getState().user.credentials.userHandle;

    if(userHandle) {
        db.collection("Trash")
            .where("userHandle", "==", userHandle)
            .orderBy("createdAt", "desc")
            .onSnapshot(function (querySnapshot) {
                let trash = [];
                querySnapshot.forEach(function (doc) {
                    trash.push({
                        id: doc.id,
                        tipo: doc.data().type,
                        creado: doc.data().createdAt,
                    });
                });

                dispatch({
                    type: SET_TRASH_HISTORY,
                    // if the json returns null, i.e. the
                    // stat-cards table is blank - empty
                    // then we'll return an empty object
                    payload: trash
                });

            });
    }
};



export default getTrashHistory();
