import "dotenv/config"

import express from "express";
import connectDB from "./config/DB.js";
import cors from "cors";
import { Server } from "socket.io";
import httpServer from 'http'
import socketServer from "./sockets/socketServer.js";
import eventRouter from "./routes/eventRoute.js";

const app = express();
const port = process.env.PORT || 8000;

const server = httpServer.createServer(app);

app.use(express.json());
const io = new Server(server, {
    cors:"*",
});

app.use(cors());

connectDB();

socketServer(io);
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api/events', eventRouter);

app.listen(port, ()=>{
    console.log(`server listening at ${port}`);
});