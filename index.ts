import fs from "fs";
import cors from "cors";
import path from "path";
import express from "express";

const scriptsFolder = "scripts";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/help", (request, response) => {
  const help = {
    message: `To use copy and paste the "script" in "console" of a RNP Room.`,
    script: `https://chamada-rnp.herokuapp.com/help/script`,
  };

  return response.json(help);
});

app.get("/help/script", (request, response) => {
  const scriptName = "call_script.js";

  const scriptPath = path.join(__dirname, scriptsFolder, scriptName);

  return response.sendFile(scriptPath);
});

app.get("/script", (request, response) => {
  const { original } = request.query;

  const scriptName = original ? "script_chamada.min.js" : "script_chamada.js";

  const scriptPath = path.join(__dirname, scriptsFolder, scriptName);

  if (original) {
    return response.sendFile(scriptPath);
  }

  response.type("txt");

  const fileContent = fs.readFileSync(scriptPath).toString();

  return response.send(fileContent);
});

app.get("/", (resquest, response) =>
  response.json({
    message: `Access the /help for more details. `,
  })
);

app.listen(process.env.PORT || 3333, () => console.log("The app is running"));
