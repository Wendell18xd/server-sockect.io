class Sockets {
  constructor(io) {
    this.io = io;
  }

  socketEvents() {
    //On Connection
    this.io.on("connection", (socket) => {
      //Escuchar Evento: mensaje-to-server
      socket.on("mensaje-to-server", (data) => {
        console.log(data);
        this.io.emit("mensaje-from-serve", data);
      });
    });
  }
}

module.exports = Sockets;
