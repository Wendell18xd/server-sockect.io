//Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Sockets = require("./Sockets");

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
  }

  middlewares() {
    //Desplegar el directorio publico
    this.app.use(express.static("public"));
  }

  configurarSockets() {
    const sockets = new Sockets(this.io);
    sockets.socketEvents();
  }

  execute() {
    //Inicializar middlewares
    this.middlewares();

    //Inicializar Socket
    this.configurarSockets();

    //Inicializar server
    this.server.listen(this.port, () => {
      console.log("Server corriendo el puerto: ", this.port);
    });
  }
}

module.exports = Server;
