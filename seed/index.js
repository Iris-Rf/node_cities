const puppeteer = require("puppeteer");
const fs = require("fs");
const http = require("http");

//ayyy dios mio

const cityInfoJSON = {};

const browserURL = async (city) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(`https://es.wikipedia.org/wiki/${city}`);

  await page.screenshot({ path: `./screenshot/wiki-${city}.jpg` });
  const cityInfo = await page.$$eval(".infobox.geography.vcard", (nodes) => {
    return nodes.map((node) => {
      name: node.querySelector(".cabecera.mapa.fn.org")?.innerText;
    });
  });
  cityInfoJSON = await cityInfo;
};

browserURL("Tarragona");

cityInfoJSON = await JSON.stringify(cityInfo);
fs.writeFile(
  "./data.json",
  cityInfoJSON,
  (error) => error && console.log("Ha habido un error.")
);

const PORT = 8080;
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`server started in http://localhost:${PORT}`);
});
