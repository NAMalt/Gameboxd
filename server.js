const express = require('express');
const fs = require('fs');
const path = require('path');
const open = (...args) => import('open').then(({default: open}) => open(...args));

const app = express();
const port = 3000;

app.use(express.json());

//security
app.use(express.static(path.join(__dirname, 'public')));

const ACCOUNTS_FILE = './accounts.json';

//ROOT route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API get
app.get('/api/accounts', (req, res) => {
    fs.readFile(ACCOUNTS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error reading database.");
        res.json(JSON.parse(data));
    });
});

// API create
app.post('/api/accounts', (req, res) => {
    const newUser = req.body;
    fs.readFile(ACCOUNTS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Read error.");
        const accounts = JSON.parse(data);
        if (accounts.some(u => u.username === newUser.username)) {
            return res.status(400).json({ message: "Username exists" });
        }
        accounts.push(newUser);
        fs.writeFile(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), (err) => {
            if (err) return res.status(500).send("Write error.");
            res.status(201).json({ message: "Created" });
        });
    });
});

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    //automatic open
    await open(`http://localhost:${port}/`); 
});