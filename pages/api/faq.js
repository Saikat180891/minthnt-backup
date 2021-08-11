import path from "path";
import fs from "fs";

export default (req, res) => {
  const filePath = path.join(process.cwd(), "public", "faq.json");
  if (req.method === "GET") {
    const fileContent = fs.readFileSync(filePath, "utf8");
    res.status(200).json(JSON.parse(fileContent));
  } else if (req.method === "POST") {
    fs.writeFileSync(filePath, req.body);
    res.status(201).json(JSON.parse(req.body));
  }
};
