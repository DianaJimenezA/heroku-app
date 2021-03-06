var express = require('express');
var app = express();
var fs = require("fs");
var port = process.env.PORT || 3000;

app.get('/rev', function (req, res) {
   var turno = req.query.turno;
   var estado = req.query.estado;
   var arbol = [];
   var nodo = {
      posfila: 0,
      poscolumna: 0,
      posvalor: 0
   };
   var text = "Proyecto 1 Clase IA";
   console.log(turno);
   console.log(estado);
   if (turno != undefined && estado != undefined) {
      //construccion de tablero
      var tablero = [[], [], [], [], [], [], [], []];

      for (var i = 0; i < estado.length; i++) {
         if (i <= 7) {
            tablero[0].push(estado[i]);
         }
         else if (i <= 15) {
            tablero[1].push(estado[i]);
         }
         else if (i <= 23) {
            tablero[2].push(estado[i]);
         }
         else if (i <= 31) {
            tablero[3].push(estado[i]);
         }
         else if (i <= 39) {
            tablero[4].push(estado[i]);
         }
         else if (i <= 47) {
            tablero[5].push(estado[i]);
         }
         else if (i <= 55) {
            tablero[6].push(estado[i]);
         }
         else if (i <= 63) {
            tablero[7].push(estado[i]);
         }
      }
      console.log(tablero);
      //creacion de nodos de posicion para arbol
      var ficha = turno;  //0 negro, 1=blanco
      //Movimientos validos y creacion de arbol
      for (var j = 0; j < 8; j++) {
         for (var m = 0; m < 8; m++) {
            valCasilla = tablero[j][m];
            if (valCasilla == '2') {
               //vacia
            }
            else if (valCasilla != turno) {

               var indice = m - 1;
               if (indice < 0) { }
               else {
                  if (tablero[j][indice] == '2') {
                     var l = 1;
                    
                     for (var z = indice; z < 8; z++) {
                        
                        if (tablero[j][z] == turno) {
                           
                           arbol.push({
                              posfila: j,
                              poscolumna: indice,
                              posvalor: 0
                           });
                           
                        }
                        if (l == 3) {

                           z = 8;
                        } l = l + 1;
                     }
                  }
               }
            }
         }
      }
      console.log(arbol);
      for (var j = 0; j < 8; j++) {
         for (var m = 0; m < 8; m++) {
            valCasilla = tablero[m][j];
            if (valCasilla == '2') {
               //vacia
            }
            else if (valCasilla != turno) {

               var indice = m - 1;
               var col = j;

               if (indice < 0) { }
               else {
                  if (tablero[indice][j] == '2') {
                     var l = 1;
                     for (var z = indice; z < 8; z++) {
                        if (tablero[z][j] == turno) {
                           arbol.push({
                              posfila: indice,
                              poscolumna: j,
                              posvalor: 0
                           });
                        }
                        if (l == 3) {

                           z = 8;
                        } l = l + 1;
                     }

                  }
               }
            }
         }
      }
      console.log(arbol);
      for (var j = 7; j >= 0; j--) {
         for (var m = 7; m >= 0; m--) {
            valCasilla = tablero[m][j];

            if (valCasilla == '2') {
               //vacia
            }
            else if (valCasilla != turno) {

               var indice = m + 1;
               var col = j;

               if (indice > 7) { }
               else {

                  if (tablero[indice][j] == '2') {
                     var l = 1;
                     for (var z = 1; z < indice; z++) {

                        if (tablero[indice - z][j] == turno) {
                           arbol.push({
                              posfila: indice,
                              poscolumna: j,
                              posvalor: 0
                           });
                        }
                        if (l == 2) {

                           z = indice - 2;
                        } l = l + 1;
                     }
                  }
               }
            }
         }
      }
      console.log(arbol);
      //Obtencion de movimientos <-
      for (var j = 0; j < 8; j++) {
         for (var m = 7; m >= 0; m--) {
            valCasilla = tablero[j][m];
            if (valCasilla == '2') {
               //vacia
            }
            else if (valCasilla != turno) {

               var indice = m + 1;
               if (indice > 8) { }
               else {
                  if (tablero[j][indice] == 2) {
                     var l = 1;
                     console.log('posfila:' + j + " poscolumna:" + indice);
                     for (var z = indice; z >= 0; z--) {

                        if (tablero[j][z] == turno) {
                           arbol.push({
                              posfila: j,
                              poscolumna: indice,
                              posvalor: 0
                           });
                        }
                        if (l == 3) {

                           z = 0;
                        } l = l + 1;

                     }
                  }
               }
            }
         }
      }
      for (var j = 0; j < 8; j++) {
         for (var m = 0; m < 8; m++) {
            if (tablero[j][m] == 2) {
               var filaUp = j - 1;
               var colDer = m + 1;
               var colizq = m - 1;
               var filaDown = j + 1;
               if (filaUp >= 0 && colizq >= 0) {
                  var valCas = tablero[filaUp][colizq];
                  if (valCas != turno && valCas!="2") {
                     var filaUp2 = filaUp - 1;
                     var colizq2 = colizq - 1;
                     if (filaUp2 >= 0 && colizq2 >= 0) {
                        var valCas2 = tablero[filaUp2][colizq2];
                        if (valCas2 == turno) {
                           arbol.push({
                              posfila: j,
                              poscolumna: m,
                              posvalor: 0
                           });
                        }
                     }
                  }
               }
               if (filaUp >= 0 && colDer < 8) {
                  var valCas = tablero[filaUp][colDer];
                  if (valCas != turno && valCas!="2") {
                     var filaUp2 = filaUp - 1;
                     var colDer2 = colDer + 1;
                     if (filaUp2 >= 0 && colDer2 < 8) {
                        var valCas2 = tablero[filaUp2][colDer2];
                        if (valCas2 == turno) {
                           arbol.push({
                              posfila: j,
                              poscolumna: m,
                              posvalor: 0
                           });
                        }
                     }
                  }
               }
               if (filaDown < 8 && colizq >= 0) {
                  var valCas = tablero[filaDown][colizq];
                  if (valCas != turno && valCas !="2") {
                     var filaDown2 = filaDown + 1;
                     var colizq2 = colizq - 1;
                     if (filaDown2 < 8 && colizq2 >= 0) {
                        var valCas2 = tablero[filaDown2][colizq2];
                        if (valCas2 == turno) {
                           arbol.push({
                              posfila: j,
                              poscolumna: m,
                              posvalor: 0
                           });
                        }
                     }
                  }
               }
               if (filaDown < 8 && colDer < 8) {
                  var valCas = tablero[filaDown][colDer];
                  if (valCas != turno && valCas!="2") {
                     var filaDown2 = filaDown + 1;
                     var colDer2 = colDer + 1;
                     if (filaDown2 < 8 && colDer2 < 8) {
                        var valCas2 = tablero[filaDown2][colDer2];
                        if (valCas2 == turno) {
                           arbol.push({
                              posfila: j,
                              poscolumna: m,
                              posvalor: 0
                           });
                        }
                     }
                  }
               }
            }
         }
      }
      console.log(arbol);
      var matrizvalores = [
         [120, -20, 20, 5, 5, 20, -20, 120],
         [-20, -40, -5, -5, -5, -5, -40, -20],
         [20, -5, 15, 3, 3, 15, -5, 20],
         [5, -5, 3, 3, 3, 3, -5, 5],
         [5, -5, 3, 3, 3, 3, -5, 5],
         [20, -5, 15, 3, 3, 15, -5, 20],
         [-20, -40, -5, -5, -5, -5, -40, -20],
         [120, -20, 20, 5, 5, 20, -20, 120]
      ]
      //get min max con asignacion de valores a los nodos hoja
      console.log(arbol);
      for (var i = 0; i < arbol.length; i++) {
         arbol[i].posvalor = matrizvalores[arbol[i].posfila][arbol[i].poscolumna];
      }
      //MinMax Eleccion
      var nodo = undefined;
      var arbol2 = [];
      for (var i = 0; i < arbol.length; i++) {
         nodo = arbol[i];
         if ((i + 1) != arbol.length) {
            var nodo2 = arbol[i + 1];
            if (nodo.posvalor < nodo2.posvalor) {
               arbol2.push(nodo);
            }
            else {
               arbol2.push(nodo2)
            }
            i = i + 1;
         }
      }
      for (var i = 0; i < arbol2.length; i++) {
         if (i == 0) {
            nodo = arbol2[i];
         }

         if ((i + 1) != arbol2.length) {
            var nodo2 = arbol2[i + 1];
            if (nodo2.posvalor > nodo.posvalor) {
               nodo = nodo2;
            }
         }
      }

      var posfilaR = 5;
      var columanaR = 4;
      if (nodo != undefined) {
         posfilaR = nodo.posfila;
         columanaR = nodo.poscolumna;
      }

      text = posfilaR + "" + columanaR;
   }

   res.send(text);
})

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})