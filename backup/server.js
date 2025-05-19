const http = require("http");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const backupDir = "./saved_dumps";

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/start") {
    let body = "";

    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const { delay } = JSON.parse(body);

        if (!delay || typeof delay !== "number" || delay <= 0) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("Invalid delay");
        }

        const date = new Date();
        console.log(`[${date.toISOString()}] Backup prévue dans ${delay} secondes`);

        setTimeout(() => {
          const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
          const filename = path.join(backupDir, `dataviser_backup_${timestamp}.sql`);

          if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
          }

          const cmd = `mysqldump -h localhost -u dev -pdev dataviser > ${filename}`;
          exec(cmd, (err, stdout, stderr) => {
            if (err) {
              console.error("Erreur backup:", err.message);
            } else {
              console.log(`Backup effectuée : ${filename}`);
            }
          });
        }, delay * 1000);

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Backup programmée");
      } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid JSON body");
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(8080, () => {
  console.log("Serveur backup : port 8080");
});
