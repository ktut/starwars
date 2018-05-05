// DEPENDENCIES

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let PORT = 3000;

// Data
var characters = [{
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  }, {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }, {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }];

// routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/characters', function(req, res) {
    return res.json(characters);
});

app.get('/api/characters/:character', function(req, res) {
    // where you'd make sql connection, call to get yoda
    let chosen = req.params.character;

    for (let i = 0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            res.json(characters[i]);
        }
    }

    return res.send('no character found');
});

// create new characters
app.post('/api/characters', function (req, res) {
    let newCharacter = req.body;
    characters.push(newCharacter);
    res.json("you added " + newCharacter);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});