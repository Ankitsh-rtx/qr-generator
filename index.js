import express from "express";
import bodyparser from "body-parser";
import qrcode from 'qr-image';
import fs from 'fs';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  //generates a diffrent file from index1.js using this command..
  res.sendFile(__dirname + "/index.html");
});

app.post("/submit",(req,res)=>{
    console.log(req.body);
    console.log(req.body.text);
    generateQr(req.body.text);
    res.sendFile(__dirname+"/qrcode.png");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});




function generateQr(text){
    const qrCodeValue = qrcode.image(text, { type: 'png' });
    // Create a txt file to save the user input
    fs.writeFileSync('user_input.txt', `User entered URL: ${text}`);

    // Save the QR code as an PNG file
    qrCodeValue.pipe(fs.createWriteStream('qrcode.png'));
}