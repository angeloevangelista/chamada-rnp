import fs from "fs";
import cors from "cors";
import path from "path";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/help", (request, response) => {
  const filePath = path.join(__dirname, "script_chamada.js");

  return response.sendFile(filePath);
});

app.get("/", (request, response) => {
  let { students } = request.query;

  if (!students) {
    return response.json({
      success: false,
      message: '"students" não encontrado.',
    });
  }

  students = String(students);

  const serializedStudents = students.split(",");

  const formattedList = `Chamada ${new Date().toLocaleDateString()}

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

app.listen(process.env.PORT || 3333, () => console.log("running"));
