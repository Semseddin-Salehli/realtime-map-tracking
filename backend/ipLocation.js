
const io = require("socket.io-client");

const socket = io("http://localhost:5000");

async function sendIPLocation() {
  try {
    const res = await fetch("http://ip-api.com/json/");
    const data = await res.json();
    const { lat, lon } = data;

    console.log("Bilgisayar konumu:", lat, lon);

    socket.emit("sendLocation", {
      id: "bilgisayar_ip",
      lat,
      lng: lon,
    });
  } catch (err) {
    console.error(err);
  }
}

// 5 saniyede bir konum gönder
setInterval(sendIPLocation, 5000);
