import { Router } from "express";

import Server from "../models/server";

const serverHandler = Router();

serverHandler.get("/servers", async (req, res, next) => {
  try {
    const servers = await Server.findAll();

    res.status(200).json({
      status: 200,
      message: "Sucessfully fetched servers",
      data: servers,
    });
  } catch (error) {
    console.log(error);
  }
});

serverHandler.post("/server", async (req, res, next) => {
  const name = req.body.name;
  const url = req.body.url;

  try {
    const server = await Server.create({ name, url });

    res
      .status(201)
      .json({ status: 200, message: "Server created", data: server });
  } catch (error) {
    console.log(error);
  }
});

serverHandler.patch("/server/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const server = await Server.findByPk(id);
    res
      .status(200)
      .json({ status: 200, message: "Server updated", data: server });
  } catch (error) {
    console.log(error);
  }
});

serverHandler.delete("/server/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const server = await Server.findByPk(id);

    if (server) {
      server.destroy();
      res
        .status(200)
        .json({ status: 204, message: "Server deleted", data: server });
    }

    res
      .status(404)
      .json({ status: "404", message: "Server not found", data: [] });
  } catch (error) {
    console.log(error);
  }
});

export default serverHandler;
