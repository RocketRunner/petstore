const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from 'html' folder
app.use(express.static(path.join(__dirname, "html")));

// Start the server
app.listen(port, () => {
    console.log(`Petstore API running!`);
});


// In-memory database
let allPets = [
    { id: 1, name: "vovse", type: "hund", status: "tilsalg" },
    { id: 2, name: "misser", type: "kat", status: "tilsalg" },
    { id: 3, name: "henning", type: "kat", status: "solgt" },
    { id: 4, name: "henning", type: "hund", status: "solgt" },
];

// OPGAVE 1
// GET endpoint - Vis alle kæledyr
app.get("/pets", (request, response) => {
    response.json(allPets);
});
