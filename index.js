const express = require("express")
const hubs = require("./hubs/hubs-model")
const hubsRouter = require("./hubs/hubs-router");
const welcomeRouer = require("./hubs/welcome-router");

const server = express()
const port = 4000

server.use(express.json());
server.use("/api/welcome", welcomeRouer);
server.use("/api/hubs", hubsRouter);

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
