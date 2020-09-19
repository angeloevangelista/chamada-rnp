import fs from "fs";
import cors from "cors";
import path from "path";
import express from "express";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const scriptsFolder = "scripts";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/help", (request, response) => {
  const help = {
    message: `To use this service you just need to copy and paste the script in console of a RNP Room.`,
    route_to_script: `https://chamada-rnp.herokuapp.com/help/script`,
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

  const scriptName = original ? "script_chamada.js" : "script_chamada.min.js";

  const scriptPath = path.join(__dirname, scriptsFolder, scriptName);

  if (original) {
    return response.sendFile(scriptPath);
  }

  response.type("txt");

  const fileContent = fs.readFileSync(scriptPath).toString();

  return response.send(fileContent);
});

app.get("/", (request, response) => {
  let { students } = request.query;

  if (!students) {
    return response.json({
      message: `Access /help for more details. `,
      error: "students param not found.",
    });
  }

  students = String(students);

  const serializedStudents = students.split(",");

  const titleTemplate = "'Chamada dia' MM/dd/yyyy";

  const formattedTitle = format(new Date(), titleTemplate, {
    locale: ptBR,
  });

  const formattedList = `${formattedTitle}

${serializedStudents.map((s) => `${s}`)}
  `.replace(/,/gi, "\n");

  fs.writeFile("./chamada.txt", formattedList, function (err) {
    if (err) {
      return response.json({
        success: false,
        message: err,
      });
    }
  });

  const filePath = path.join(__dirname, "chamada.txt");

  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
    } else {
      response.writeHead(200, {
        "Content-disposition": `attachment;filename=chamada.txt`,
      });

      response.write(file, "binary");

      return response.end(undefined, "binary");
    }
  });
});

app.listen(process.env.PORT || 3333, () => console.log("The app is running"));
