const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const City = require("./src/city/citySchema");
const cors = require("cors");
const express = require("express");
const mongoURI = process.env.MONGO_URI;

const browserURL = async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(`https://es.wikipedia.org/wiki/Tarragona`);

  const cityInfo = await page.$$eval("#bodyContent", (nodes) => {
    return nodes.map((node) => ({
      name: node.querySelector(".cabecera.mapa.fn.org")?.innerText,
      country: node.querySelector("[title='España']")?.innerText,
      population: node.querySelector("tr:nth-child(17) > td")?.innerText,
      mapImage: node.querySelector(
        ".mw-kartographer-map.mw-kartographer-container.center.mw-kartographer-link > img"
      )?.src,
      history: node.querySelector(".rellink.noprint.hatnote ~ p")?.innerText,
      places: "El puente del Diablo ",
    }));
  });
  return cityInfo;
};

const connect = async () => {
  try {
    const dbConnect = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const cityInfo = await browserURL();

    const allCities = await City.find();
    if (allCities.length) await City.collection.drop();

    const citySeed = await cityInfo.map((city) => new City(city));
    await City.insertMany(citySeed);

    const { name, host } = dbConnect.connection;
    console.log(`Conectado a la DB 👀: ${name} en el host❤️: ${host}`);
  } catch (error) {
    console.error(`No se ha podido conectar a la DB 💔`, error);
  }
};

browserURL();

connect();

const server = express();

server.use(cors());

server.listen(process.env.PORT, console.log("Puerto levantado"));
