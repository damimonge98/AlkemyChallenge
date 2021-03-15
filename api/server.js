const express = require ("express");
const morgan = require ("morgan");

const {db} = require ("./src/db.js");

const app = express();
const puerto = 3001;


//middlewares
app.use(morgan ("dev")); //Esto muestra las peticiones en la terminal
app.use (express.json())

//Conectamos la base de datos al servidor
db.sync({ force:true })
    .then(function () {
        app.listen (puerto, function () {
            console.log("Corriendo en el puerto 3001")
        })

    })


app.get ("/", (req, res)=> {
    res.status(201);
    res.send("Inicio")
})