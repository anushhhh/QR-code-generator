import qr from "qrcode";
import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));


app.get('/', (req, res)=>{
    res.render("index");
})

app.post('/scan', (req, res)=>{
    try{
        const url = req.body.qrcodename;
        console.log(url);
        qr.toDataURL(url, (error, src)=>{
            console.log(src);
            if(error){
                res.send(error);
            }
            res.render("qrcode", {
                qr_code: src,
            })
        })
        qr.toFile('./qrimg.png', url, {
            errorCorrectionLevel: 'H'
        }, (error)=>{
            if(error) throw error;
            console.log("QR code saved");
        })
        
    } catch(error){
        console.log(error);
    }
})

app.get('/qr-code.png', (req, res)=>{
    var imgpath = path.join(__dirname, "qrimg.png");
    console.log(imgpath);
    res.sendFile(imgpath);
})
app.listen(3000, function(){
    console.log("Server running at http://localhost:3000");
})
// inquirer
//     .prompt([{
//         message: "Type in your URL: ",
//         name: "URL"
//     }
//     ])
//     .then((answers) =>{
//         const url = answers.URL;
//         console.log(url);
//         var qr_img = qr.image(url);
//         qr_img.pipe(fs.createWriteStream("qrimg.png"));

//         fs.writeFile("URL.txt", url, (error) =>{
//             if(error){
//                 console.log(error);
//             }
//             else{
//                 console.log(("File Saved"));
//             }
//         })
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
