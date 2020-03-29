const http = require("http");
const app = require("./model/router");

http.createServer(app).listen(8888);
