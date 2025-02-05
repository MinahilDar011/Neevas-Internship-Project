const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
});

// Upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // Image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // Image upload path
    let filepath = 'public/uploads/' + imagename;

    // Move the uploaded file to the destination path
    file.mv(filepath, (err) => {
        if(err){
            throw err;
        } else{
            // Return the upload path to the client
            res.json(`uploads/${imagename}`);
        }
    });
});

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
});

// 404 handler
app.use((req, res) => {
    res.json("404");
});

app.listen("3000", () => {
    console.log('listening......');
});
 