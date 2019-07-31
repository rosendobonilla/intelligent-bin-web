import firebase from "../../Firebase/firebaseConfig";
import {
    SET_USER_RECYCLING
} from '../../types';

import axios from "axios";

const db = firebase.firestore();

var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Deciembre'];


let date = new Date();
let firstDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
let lastDayThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
var now = new Date();
var nombreEsteMes = meses[now.getMonth()]; //

//Mes anterior
let mesAnterior = new Date();
mesAnterior = new Date(mesAnterior.setMonth(mesAnterior.getMonth() - 1));
let firstDayMesAnterior = new Date(mesAnterior.getFullYear(), mesAnterior.getMonth(), 1);
let lastDayMesAnterior = new Date(mesAnterior.getFullYear(), mesAnterior.getMonth() + 1, 0);
var nombreMesAnterior = meses[mesAnterior.getMonth()]; //


//Mes menos 2
let mesDosAntes = new Date();
mesDosAntes = new Date(mesDosAntes.setMonth(mesDosAntes.getMonth() - 2));
let firstDayDosAntes = new Date(mesDosAntes.getFullYear(), mesDosAntes.getMonth(), 1);
let lastDayDosAntes = new Date(mesDosAntes.getFullYear(), mesDosAntes.getMonth() + 1, 0);
var nombreDosMesesAntes = meses[mesDosAntes.getMonth()]; //


//Mes menos 3
let mesTresAntes = new Date();
mesTresAntes = new Date(mesTresAntes.setMonth(mesTresAntes.getMonth() - 3));
let firstDayTresAntes = new Date(mesTresAntes.getFullYear(), mesTresAntes.getMonth(), 1);
let lastDayTresAntes = new Date(mesTresAntes.getFullYear(), mesTresAntes.getMonth() + 1, 0);
var nombreTresMesesAntes = meses[mesTresAntes.getMonth()]; //

let cuatroMeses = [];

cuatroMeses.push(nombreTresMesesAntes);
cuatroMeses.push(nombreDosMesesAntes);
cuatroMeses.push(nombreMesAnterior);
cuatroMeses.push(nombreEsteMes);




const getUserRecycling = () => (dispatch) => {


    axios
        .post('/user/userHandle')
        .then((res) => {
            db.collection("Recycling")
                .where("userHandle", "==", res.data.userHandle)
                .onSnapshot(function(querySnapshot) {
                    let contenedor = [];
                    let historial4meses = [];
                    let totalAhorradoEsteMes = 0;
                    let totalAhorradoMesAnterior = 0;
                    let totalAhorradoDosMesesAntes = 0;
                    let totalAhorradoTresMesesAntes = 0;

                    querySnapshot.forEach(function (doc) {
                        if(doc.data().createdAt >= firstDayThisMonth.toISOString() && doc.data().createdAt <= lastDayThisMonth.toISOString()){
                            totalAhorradoEsteMes = totalAhorradoEsteMes + doc.data().quantityRecycled;
                        }
                        if(doc.data().createdAt >= firstDayMesAnterior.toISOString() && doc.data().createdAt <= lastDayMesAnterior.toISOString()){
                            totalAhorradoMesAnterior = totalAhorradoMesAnterior + doc.data().quantityRecycled;
                        }
                        if(doc.data().createdAt >= firstDayDosAntes.toISOString() && doc.data().createdAt <= lastDayDosAntes.toISOString()){
                            totalAhorradoDosMesesAntes = totalAhorradoDosMesesAntes + doc.data().quantityRecycled;
                        }
                        if(doc.data().createdAt >= firstDayTresAntes.toISOString() && doc.data().createdAt <= lastDayTresAntes.toISOString()){
                            totalAhorradoTresMesesAntes = totalAhorradoTresMesesAntes + doc.data().quantityRecycled;
                        }
                    });

                    historial4meses.push(totalAhorradoTresMesesAntes);
                    historial4meses.push(totalAhorradoDosMesesAntes);
                    historial4meses.push(totalAhorradoMesAnterior);
                    historial4meses.push(totalAhorradoEsteMes);


                    contenedor.push([historial4meses, cuatroMeses]);

                    dispatch({
                        type: SET_USER_RECYCLING,
                        // if the json returns null, i.e. the
                        // stat-cards table is blank - empty
                        // then we'll return an empty object
                        payload: contenedor
                    });
                });
        })
        .catch((err) => console.log(err));


};



export default getUserRecycling();
