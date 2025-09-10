const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı:", socket.id);

  // Konum bilgisi geldiğinde tüm clientlere yayınla
  socket.on("sendLocation", (data) => {
    console.log("Yeni konum:", data);
    io.emit("receiveLocation", data);
  });

  socket.on("disconnect", () => {
    console.log("Kullanıcı ayrıldı:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Server 5000 portunda çalışıyor");
});
