const express = require ("express");
const morgan = require ("morgan");
const routes = require ("./src/routes/index.js")
const {db} = require ("./src/db.js");
const app = express();
const cors = require ("cors");
const port = 3001;

//cors
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
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
