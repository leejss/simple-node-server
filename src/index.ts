import * as http from "http";
import * as url from "url";

const PORT = 3000;

type RouteHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => void;

type Routes = {
  [key: string]: RouteHandler;
};

interface RouteContext {
  params: {
    [key: string]: string;
  };
  query: {
    [key: string]: string;
  };
}

const routes: Routes = {
  "GET /": (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello, world!" }));
  },
  "GET /health": (req, res) => {
    res.writeHead(200);
    res.end();
  },
};
const matchRoute = (method: string, pathname: string): RouteHandler => {
  // Create route key
  const routeKey = `${method.toUpperCase()} ${pathname}`;
  if (routes[routeKey]) {
    return routes[routeKey];
  }
  // TODO: Implement route matching with params
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url || "", true);
  const handler = matchRoute(req.method || "", parsedUrl.pathname || "");

  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
