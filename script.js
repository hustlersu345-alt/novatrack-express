<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQCvjTXUO4RuPHkD7Ym5LP9duLmcWpsKM",
  authDomain: "novatrack-express.firebaseapp.com",
  databaseURL: "https://novatrack-express-default-rtdb.firebaseio.com",
  projectId: "novatrack-express",
  storageBucket: "novatrack-express.firebasestorage.app",
  messagingSenderId: "760595516025",
  appId: "1:760595516025:web:5816b7a4d7e4b43e24e2a8"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.track = async function () {
  const code = document.getElementById("trackInput").value.trim();
  const resultBox = document.getElementById("result");

  const snapshot = await get(ref(db, "shipments/" + code));

  if (snapshot.exists()) {
    const data = snapshot.val();
    resultBox.innerHTML = `
      <h3>Status: ${data.status}</h3>
      <p><strong>From:</strong> ${data.origin}</p>
      <p><strong>To:</strong> ${data.destination}</p>
      <p><strong>Estimated Delivery:</strong> ${data.delivery}</p>
    `;
  } else {
    resultBox.innerHTML = "<p>Tracking number not found.</p>";
  }

  resultBox.style.display = "block";
};
</script>