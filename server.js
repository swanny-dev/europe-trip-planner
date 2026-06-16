const http = require("http");
const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const dataDir = path.join(rootDir, "data");
const tripPath = path.join(dataDir, "trip.json");
const port = Number(process.env.PORT || 4177);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function sendJson(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(value));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error("Body too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function handleTripApi(request, response) {
  if (request.method === "GET") {
    if (!fs.existsSync(tripPath)) return sendJson(response, 404, { error: "No shared trip yet" });
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    fs.createReadStream(tripPath).pipe(response);
    return;
  }

  if (request.method === "PUT") {
    try {
      const trip = JSON.parse(await readBody(request));
      if (!Array.isArray(trip.destinations)) return sendJson(response, 400, { error: "Invalid trip" });
      fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(tripPath, `${JSON.stringify(trip, null, 2)}\n`);
      sendJson(response, 200, { ok: true, savedAt: new Date().toISOString() });
    } catch {
      sendJson(response, 400, { error: "Could not save trip" });
    }
    return;
  }

  response.writeHead(405, { Allow: "GET, PUT" });
  response.end();
}

function safeStaticPath(urlPath) {
  const requestedPath = urlPath === "/" ? "/index.html" : decodeURIComponent(urlPath);
  const resolved = path.resolve(rootDir, `.${requestedPath}`);
  if (!resolved.startsWith(rootDir)) return "";
  return resolved;
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  if (url.pathname === "/api/trip") {
    await handleTripApi(request, response);
    return;
  }

  const staticPath = safeStaticPath(url.pathname);
  if (!staticPath || !fs.existsSync(staticPath) || fs.statSync(staticPath).isDirectory()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const ext = path.extname(staticPath).toLowerCase();
  response.writeHead(200, {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Cache-Control": ext === ".html" ? "no-store" : "public, max-age=60"
  });
  fs.createReadStream(staticPath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Europe trip planner running at http://127.0.0.1:${port}/`);
});
