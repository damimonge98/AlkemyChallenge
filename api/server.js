const express = require ("express");
const morgan = require ("morgan");
const routes = require ("./src/routes/index.js")



const {db} = require ("./src/db.js");

const app = express();
const port = 3001;


//middlewares
app.use(morgan ("dev")); 
app.use (express.json());


app.use ("/", routes)


//El servidor corre una vez que express conecta la base de datos
db.sync({ force:false })
    .then(function () {
        app.listen (port, function () {
            console.log("Server running on port", port , "!")
        })

    })
