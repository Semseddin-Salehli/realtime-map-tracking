const io = require("socket.io-client");
const socket = io("http://localhost:5000");

// Simülasyon: Ankara içinde rastgele konum gönder
setInterval(() => {
  const lat = 39.92 + Math.random() * 0.01;
  const lng = 32.85 + Math.random() * 0.01;

  socket.emit("sendLocation", { id: "arac_1", lat, lng });
}, 3000);
