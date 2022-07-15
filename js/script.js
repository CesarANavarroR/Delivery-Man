// EL USUARIOS DEBE DE ATRAPAR LOS PRODUCTOS QUE CONSUME MAS
FPS = 10; // No cambien al valor de FPS>60 o tu tele se convetira en un horno xD
let canvas;
let ctx; // Context

// Imagen de producto
let imgProd,
    imgProd1,
    imgProd2,
    imgProd3,
    imgProd4,
    imgProd5,
    imgBowl; // Imagen de canasta
// objects for producta
let bowl,
    pro1,
    pro2,
    pro3,
    pro4,
    pro5,
    pro6;
// == Objetos y funciones ==
let dibujando = false;
let m = { x: 0, y: 0 };
// contador de puntos
let count = 0;
// CONTADOR DE PRODUCTOS PARA RECABAR DATOS
let pr = [0, 0, 0, 0, 0, 0];
let eventsRy = [
    { event: "mousedown", func: "onStart" },
    { event: "touchstart", func: "onStart" },
    { event: "mousemove", func: "onMove" },
    { event: "touchmove", func: "onMove" },
    { event: "mouseup", func: "onEnd" },
    { event: "touchend", func: "onEnd" },
    { event: "mouseout", func: "onEnd" },
];

function onStart(evt) {
    m = oMousePos(canvas, evt);
    dibujando = true;
}

function onMove(evt) {
    /*
    Funcion que se ejecuta cuando se ejecuta el evento
    de raton mousemove o de tacto touchmove
    */
    if (dibujando) { // Dibujamos?
        // Posicion anterior de raton o de tacto
        ctx.moveTo(m.x, m.y);
        // Detectamos la nueva posicion
        m = oMousePos(canvas, evt);
        // ==== aqui se pone lo de la canasta
        let x = m.x;
        let y = m.y;
        //console.log(e.layerX,e.layerY);
        if (x > canvas.width) {
            bowl.move(canvas.width, canvas.height - 105);
        } else if (x < 250) {
            bowl.move(x, canvas.height - 105);
        } else {
            bowl.move(x, canvas.height - 105);
        }
        //console.log("probando actualizar");
        //console.log(bowl);
    }
}

function onEnd(evt) { dibujando = false; }

function oMousePos(canvas, evt) {
    // devuelve el tamaño de un elemento y su posición relativa respecto a la ventana de visualización
    let ClientRect = canvas.getBoundingClientRect();
    let e = evt.touches ? evt.touches[0] : evt;
    return {
        x: Math.round(e.clientX - ClientRect.left),
        y: Math.round(e.clientY - ClientRect.top),
    };
}

// Funcion para obtener un valor random
function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

function borrarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // canvas.width = 1080;
    // canvas.height = 1500;
}

// == Productos P&G ==
let productos = function(y, imagen) {
    this.x = getRandomInt(1, canvas.width);
    this.y = y;
    this.img = imagen;
    this.alto = 75;
    this.ancho = 80;
    this.vel = 1;
    // estados imprime imagen
    this.dibuja = () => {
            ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto)
                //ctx.arc(this.x + (this.ancho/2), this.y +(this.alto/2) , 10, 0,2*Math.PI,false);

            //ctx.stroke();
        }
        // movimiento random
    this.move = (vel) => {
        this.y += vel;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = getRandomInt(1, canvas.width - this.ancho);
        }
    }
    this.reset = () => {
        this.y = 0;
        this.x = getRandomInt(1, canvas.width - this.ancho);
    }

    // Esta funcion retorna las coordenadas
    this.getCoordinates = () => {
        // let coordinates = {"xp":this.x, "yp":this.y};
        // Añado la mitad del ancho a this.x por inicio de 
        let coordinates = { "xp": this.x + (this.ancho / 2), "yp": this.y + (this.alto / 2) };
        return coordinates;
    }
    this.getAnchoProducto = () => {
        return this.ancho;
    }
}

// == Canasta == 
let canasta = function(x, y) {
        this.x = x;

        this.y = y;
        // dimensiones
        this.alto = 100;
        this.ancho = 50;

        this.dibuja = () => {
                ctx.drawImage(imgBowl, this.x, this.y, this.ancho, this.alto);
                //ctx.rect(this.x, this.y, this.ancho, this.alto);
                //ctx.stroke();
            }
            // == estado movimiento segun el raton ==
        this.move = (X, Y) => {
                this.x = X - 95;
                if (this.x < 0) {
                    this.x = 0;
                }
                this.y = Y;
                //console.log(this.y);
            }
            // Obtener intervalo de posicion
        this.interval = () => {
                // valores = [this.x, this.y, this.x+this.ancho, this.y];
                valores = [{ "xi": this.x - 15, "yi": this.y }, { "xf": this.x + this.ancho + 15, "yf": this.y + 20 }];
                //console.log(valores);
                return valores;
            }
            // Logica de colicion de canasta con productos
        this.logic = () => {
                // canasta
                let c = this.interval();
                // producto
                let p = [pro1.getCoordinates(), pro2.getCoordinates(), pro3.getCoordinates(), pro4.getCoordinates(), pro5.getCoordinates(), pro6.getCoordinates()];
                console.log("entre intervales " + c[0]["xi"] + " y " + c[1]["xf"] + "Coordenadas y: " + c[0]["yi"] + " y " + c[1]["yf"]);
                console.log("producto 2 en " + (p[2]["xp"]) + " y " + p[2]["yp"]);
                if ((p[0]["xp"] > c[0]["xi"] & p[0]["xp"] < c[1]["xf"] & p[0]["yp"] > c[0]["yi"] & p[0]["yp"] < c[1]["yf"])) {
                    pr[0] += 1;
                    count += 1;
                    pro1.reset();
                } else if ((p[1]["xp"] > c[0]["xi"] & p[1]["xp"] < c[1]["xf"] & p[1]["yp"] > c[0]["yi"] & p[1]["yp"] < c[1]["yf"])) {
                    count += 1;
                    pr[1] += 1;
                    pro2.reset();
                } else if ((p[2]["xp"] > c[0]["xi"] & p[2]["xp"] < c[1]["xf"] & p[2]["yp"] > c[0]["yi"] & p[2]["yp"] < c[1]["yf"])) {
                    count += -2;
                    pr[2] += 1;
                    pro3.reset();
                } else if ((p[3]["xp"] > c[0]["xi"] & p[3]["xp"] < c[1]["xf"] & p[3]["yp"] > c[0]["yi"] & p[3]["yp"] < c[1]["yf"])) {

                    count += 1;
                    pr[3] += 1;
                    pro4.reset();
                } else if ((p[4]["xp"] > c[0]["xi"] & p[4]["xp"] < c[1]["xf"] & p[4]["yp"] > c[0]["yi"] & p[4]["yp"] < c[1]["yf"])) {

                    count += -2;
                    pr[4] += 1;
                    pro5.reset();
                } else if ((p[5]["xp"] > c[0]["xi"] & p[5]["xp"] < c[1]["xf"] & p[5]["yp"] > c[0]["yi"] & p[5]["yp"] < c[1]["yf"])) {

                    count += 1;
                    pr[5] += 1;
                    pro6.reset();
                } else {
                    if (count >= 100) {
                        location.href = 'finish.html';
                        // let storage = new Storage();
                        // storage.readFile(successCb, failureCb, options);
                    } else if (count < 0) {
                        // console.log("Game ovre");
                        location.href = 'gameover.html';
                    } else if (count >= 40) {
                        FPS + 5;
                        console.log("NIVEL 2");
                        console.log(FPS);
                    }
                }
            }
            // Muestra el puntaje acumulado
        this.puntaje = () => {
            ctx.font = '40px impact';
            ctx.fillStyle = '#000000';
            ctx.fillText(`SCORE: ${count}`, window.innerWidth / 2 - 80, 30);
        }

    }
    //  == Fin de objetos y funciones

// == Funcion principal ==
let main = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // imagen de producto
    imgProd = new Image();
    imgProd.src = 'res/01.png';
    imgProd1 = new Image();
    imgProd1.src = 'res/02.png';
    imgProd2 = new Image();
    imgProd2.src = 'res/03.png';
    imgProd3 = new Image();
    imgProd3.src = 'res/04.png';
    imgProd4 = new Image();
    imgProd4.src = 'res/05.png';
    imgProd5 = new Image();
    imgProd5.src = 'res/06.png';

    // imagen de canasta
    imgBowl = new Image();
    imgBowl.src = 'res/moto2.png';
    // Declaracion de productos
    bowl = new canasta(140, window.innerHeight - 105);
    pro1 = new productos(50, imgProd);
    pro2 = new productos(50, imgProd1);
    pro3 = new productos(50, imgProd2);
    pro4 = new productos(50, imgProd3);
    pro5 = new productos(50, imgProd4);
    pro6 = new productos(50, imgProd5);

    for (let i = 0; i < eventsRy.length; i++) {
        (function(i) {
            let e = eventsRy[i].event; // Evento
            let f = eventsRy[i].func; // Funcion
            console.log(f);
            canvas.addEventListener(
                e,
                function(evt) {
                    // evita el desplazamiento de la pantalla
                    evt.preventDefault();
                    // llama a la funcion
                    window[f](evt);
                    return;
                },
                false
            );
        })(i);
    }
    setInterval(() => {
        continua();
    }, 1000 / FPS);
}

// Bucle continuo cada 10FPS
function continua() {
    // Borramos canvas
    borrarCanvas();
    bowl.dibuja();
    bowl.logic();

    pro1.dibuja();
    pro2.dibuja();
    pro3.dibuja();
    pro4.dibuja();
    pro5.dibuja();
    pro6.dibuja();

    pro6.move(15);
    pro1.move(15);
    pro2.move(20);
    pro3.move(25);
    pro4.move(30);
    pro5.move(35);

    bowl.puntaje();
}