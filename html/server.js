// server.js
const express = require('express');
const fs = require('fs');
// Dynamic import for 'open' to handle CommonJS/ESM compatibility
const open = (...args) => import('open').then(({default: open}) => open(...args));

const app = express();
const port = 3000;

// Middleware to parse JSON data sent from the browser
app.use(express.json());

// Serve static files (HTML, CSS, JS, Images) from the root directory
app.use(express.static('.'));

const ACCOUNTS_FILE = './accounts.json';

/**
 * GET Route: Retrieves the current list of accounts from the JSON file.
 * Following the logic from the posts.json example.
 */
app.get('/api/accounts', (req, res) => {
    fs.readFile(ACCOUNTS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading accounts file:", err);
            return res.status(500).send("Error reading accounts.");
        }
        res.json(JSON.parse(data));
    });
});

/**
 * POST Route: Appends a new user account to the JSON file.
 * Uses fs.writeFile to ensure persistent storage as shown in slides.
 */
app.post('/api/accounts', (req, res) => {
    const newUser = req.body;

    fs.readFile(ACCOUNTS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file during append:", err);
            return res.status(500).send("Error reading file.");
        }

        const accounts = JSON.parse(data);
        
        // Logical check for duplicate usernames
        if (accounts.some(u => u.username === newUser.username)) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Append the new account object to the array
        accounts.push(newUser);

        // Write the updated array back to the JSON file
        fs.writeFile(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), (err) => {
            if (err) {
                console.error("Error writing to file:", err);
                return res.status(500).send("Error saving account.");
            }
            res.status(201).json({ message: "Account created!" });
        });
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

/**
 * Start the server and automatically open the browser.
 */
app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    
    try {
        // Automatically opens the browser to your index page once the server is ready
        await open(`http://localhost:${port}/index.html`);
    } catch (err) {
        console.error("Could not open browser automatically:", err);
    }
});