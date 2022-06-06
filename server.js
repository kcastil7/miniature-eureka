const express = require('express');
var uniqid = require('uniqid');
const fs = require('fs')

let notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/', (req, res) => {
    // `res.sendFile` is Express' way of sending a file
    // `__dirname` is a variable that always returns the directory that your server is running in
    res.sendFile(__dirname + '/public/index.html');
  });

  app.get('/notes', (req, res) => {
    // `res.sendFile` is Express' way of sending a file
    // `__dirname` is a variable that always returns the directory that your server is running in
    res.sendFile(__dirname + '/public/notes.html');
  });

  app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  app.post('/api/notes', (req, res) => {
    const note = {note_id: uniqid() ,title:req.body.title, text:req.body.text};
    notes.push(note);
    console.log(notes);
    fs.writeFile(__dirname + "/db/db.json",JSON.stringify(notes),function (){
        console.log("saved notes");
    });

    res.end();
  });

  app.delete('/api/notes/:id', (req, res) => {
      const id = req.params.id;
      const updatedNotes = notes.filter(function (oldNotes){
        oldNotes.id != id;
      });
      notes = updatedNotes;
      res.json(notes);
  })


app.listen(PORT, () =>
  console.log(`Note app listening at http://localhost:${PORT}`)
);