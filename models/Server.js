//Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Sockets = require("./Sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Http server
    this.server = http.createServer(this.app);

    //Configuraciones de sockects
    this.io = socketio(this.server, {
      /* configuraciones */
    });
    //Inicializar sockets
    this.sockets = new Sockets(this.io);
    this.sockets.socketEvents();
  }

  middlewares() {
    //Desplegar el directorio publico
    this.app.use(express.static("public"));
    //CORS
    this.app.use(cors());
  }

  execute() {
    //Inicializar middlewares
    this.middlewares();

    //Inicializar server
    this.server.listen(this.port, () => {
      console.log("Server corriendo el puerto: ", this.port);
    });
  }
}

module.exports = Server;
