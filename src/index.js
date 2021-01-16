import express from "express";
import path from "path";

import { appConfig } from "./config/index.js";
import { logger, requestTime } from "./middlewares/index.js";
import { routerServer } from "./routes/servers.js";

const __dirname = path.resolve();
const port = process.env.PORT ?? 3000;
const { staticFolderName } = appConfig;

const app = express();

// express key-string
const viewEngine = "view engine";

app.set(viewEngine, "ejs");
app.set("views", path.resolve(__dirname, "src/ejs-templates"));
app.get(viewEngine);

app.use(express.static(path.resolve(__dirname, `src/${staticFolderName}`)));
app.use(requestTime);
app.use(logger);

app.use(routerServer);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home page",
    pageId: "home",
  });
});

app.get("/ejs-tutorial", (req, res) => {
  res.render("ejs-tutorial", {
    title: "EJS Tutorial page",
    pageId: "ejs-tutorial",
  });
});

app.get("/test-vue", (req, res) => {
  res.render("test-vue", {
    title: "Test VueJS",
    pageId: "test-vue",
  });
});

app.get("/download", (req, res) => {
  res.download(path.resolve(__dirname, staticFolderName, "features.html"));
});

app.listen(port, () => {
  console.log(`Server has been started on port: ${port}...`);
});
