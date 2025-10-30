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

// OPGAVE 2
// GET endpoint - Vis et kæledyr efter ID
app.get("/pets/:id", (request, response) => {
    const petId = parseInt(request.params.id);
    const pet = allPets.find(p => p.id === petId);
    //const pet = getPetById(request.params.id);


    if (pet) {
        response.json(pet);

    } else {
        notFoundResponse(response);
    }
});

// OPGAVE 3
// GET endpoint - Vis et kæledyr efter navn
app.get("/pets/name/:name", (request, response) => {
    const petName = request.params.name;
    const pet = allPets.find((p) => p.name === petName);

    if (pet) {
        response.json(pet);

    } else {
        notFoundResponse(response);
    }
});

// OPGAVE 4
// GET endpoint - Vis alle kæledyr efter navn
app.get("/pets/names/:name", (request, response) => {
    const petName = request.params.name;
    const pets = allPets.filter((p) => p.name === petName);

    if (pets.length > 0) {
        response.json(pets);

    } else {
        //sig du ikke kan finde 
        notFoundResponse(response);
    }
});

function notFoundResponse(response) {
    response.status(404).json({ error: "Ingen kæledyr fundet" });
}

// OPGAVE 5
// GET endpoint - Vis kæledyr efter navn og type
app.get("/pets/names/:name/type/:type", (request, response) => {
    const type = request.params.type;
    const name = request.params.name;

    const pet = allPets.filter((p) => p.type === type && p.name === name);

    if (pet.length > 0) {
        response.json(pet);

    } else {
        notFoundResponse(response);
    }
});

// OPGAVE 6
// POST endpoint - Omdøb et kæledyr
app.post("/pets/rename", (request, response) => {
    const petId = parseInt(request.body.id);
    const name = request.body.name;

    const pet = allPets.find((p) => p.id === petId);
    //const pet = getPetById(request.params.id);

    if (pet) {
        pet.name = name;
        response.json(pet);

    } else {
        notFoundResponse(response);
    }
});

// OPGAVE 7
// POST endpoint - Tilføj et nyt kæledyr
app.post("/pets", (request, response) => {
    const newPet = {
        id: allPets.length + 1,
        name: request.body.name,
        type: request.body.type,
        status: "tilsalg"
    };

    allPets.push(newPet);
    response.status(201).json(newPet);
});

// OPGAVE 8
// GET endpoint - Vis kæledyr efter status
app.get("/pets/status/:status", (request, response) => {
    const status = request.params.status;
    const pets = allPets.filter((p) => p.status === status);

    if (pets.length > 0) {
        response.json(pets);

    } else {
        notFoundResponse(response);
    }
});

// OPGAVE 9
// POST endpoint - Sælg et kæledyr
app.post("/pets/sell", (request, response) => {
    const petId = parseInt(request.body.id);
    const pet = getPetById(petId);

    if (pet) {
        pet.status = "solgt";
        response.json(pet);

    } else {
        notFoundResponse(response);
    }
});

// Hjælpefunktion til at finde kæledyr efter ID
function getPetById(id) {
    const petId = parseInt(id);
    return allPets.find((p) => p.id === petId);
}
