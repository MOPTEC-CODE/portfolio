// Dependency relationship is: developerData -> gameData -> companyData

const developerData = {
    "Hironobu Sakaguchi":
    {
        born: 1962,
        nationality: "Japanese"
    },
    "Nobuo Uematsu":
    {
        born: 1959,
        nationality: "Japanese"
    },
    "Shinji Hashimoto":
    {
        born: 1958,
        nationality: "Japanese"
    },
    "Yoshitaka Amano":
    {
        born: 1952,
        nationality: "Japanese"
    },
    "Naoki Yoshida":
    {
        born: 1973,
        nationality: "Japanese"
    },
    "Yoshinori Kitase":
    {
        born: 1966,
        nationality: "Japanese"
    },
    "Tetsuya Nomura":
    {
        born: 1970,
        nationality: "Japanese"
    },
    "Koichi Ishii":
    {
        born: 1964,
        nationality: "Japanese"
    },
    "Nobuaki Komoto":
    {
        born: 1973,
        nationality: "Japanese"
    },
}

const gameData = {
    "Final Fantasy":
    {
        name: "Final Fantasy",
        developers: [
            // developerData["Yoshinori Kitase"],
        ],
        year: 1987
    },
    "Final Fantasy II":
    {
        name: "Final Fantasy II",
        developers: [
            // developerData["Yoshinori Kitase"],
        ],
        year: 1988
    },
    "Final Fantasy III":
    {
        name: "Final Fantasy III",
        developers: [
            // developerData["Yoshinori Kitase"],
        ],
        year: 1990
    },
    "Final Fantasy IV":
    {
        name: "Final Fantasy IV",
        developers: [
            // developerData["Yoshinori Kitase"],
        ],
        year: 1991
    },
    "Final Fantasy V":
    {
        name: "Final Fantasy V",
        developers: [
            developerData["Yoshinori Kitase"],
        ],
        year: 1992
    },
    "Final Fantasy VI":
    {
        name: "Final Fantasy VI",
        developers: [
            developerData["Yoshinori Kitase"],
            developerData["Tetsuya Nomura"],
        ],
        year: 1994
    },
    "Final Fantasy VII":
    {
        name: "Final Fantasy VII",
        developers: [
            developerData["Yoshinori Kitase"],
            developerData["Tetsuya Nomura"],
        ],
        year: 1997
    },
    "Final Fantasy VIII":
    {
        name: "Final Fantasy VIII",
        developers: [
            developerData["Yoshinori Kitase"],
            developerData["Tetsuya Nomura"],
        ],
        year: 1999
    },
    "Final Fantasy IX":
    {
        name: "Final Fantasy IX",
        developers: [
            developerData["Yoshinori Kitase"],
        ],
        year: 2000
    },
    "Final Fantasy X":
    {
        name: "Final Fantasy X",
        developers: [
            developerData["Yoshinori Kitase"],
            developerData["Tetsuya Nomura"],
        ],
        year: 2001
    },
    "Final Fantasy XI":
    {
        name: "Final Fantasy XI",
        developers: []
    },
    "Final Fantasy XII": {
        name: "Final Fantasy XII",
        developers: [],
        year: 2006
    },
    "Final Fantasy XIII": {
        name: "final Fantasy XIII",
        developers: [
            developerData["Yoshinori Kitase"]
        ],
        year: 2009
    },
    "Final Fantasy XIV": {
        name: "final Fantasy XIV",
        developers: [
            developerData["Naoki Yoshida"],
            developerData["Nobuaki Komoto"],
        ],
        year: 2010
    },
    "Final Fantasy XV": {
        name: "Final Fantasy XV",
        developers: [
            developerData["Yoshinori Kitase"],
        ],
        year: 2016
    },
    "Final Fantasy XVI": {
        name: "Final Fantasy XVI",
        developers: [
            developerData["Naoki Yoshida"],
        ],
        year: 2023
    },
    "Final Fantasy VII Remake": {
        name: "Final Fantasy VII Remake",
        developers: [
            developerData["Yoshinori Kitase"],
        ],
        year: 2020
    },
    "Final Fantasy VII Rebirth": {
        name: "Final Fantasy VII Rebirth",
        developers: [
            developerData["Yoshinori Kitase"],
        ],
        year: 2024
    },
    "Final Fantasy Tactics": {
        name: "Final Fantasy Tactics",
        developers: [],
        year: 1997
    }
}

const companyData = {
    "Square Enix": {
        name: "Square Enix",
        alternateName: "Square",
        founded: 1986,
        headquarters: "Tokyo, Japan",
        gamesDeveloped: [
            gameData["Final Fantasy I"],
            gameData["Final Fantasy II"],
            gameData["Final Fantasy III"],
            gameData["Final Fantasy IV"],
            gameData["Final Fantasy V"],
            gameData["Final Fantasy VI"],
            gameData["Final Fantasy VII"],
            gameData["Final Fantasy VIII"],
            gameData["Final Fantasy IX"],
            gameData["Final Fantasy X"],
            gameData["Final Fantasy XI"],
            gameData["Final Fantasy XII"],
            gameData["Final Fantasy XIII"],
            gameData["Final Fantasy XIV"],
            gameData["Final Fantasy XV"],
            gameData["Final Fantasy XVI"],
            gameData["Final Fantasy VII Remake"],
            gameData["Final Fantasy VII Rebirth"],
            gameData["Final Fantasy Tactics"],
        ]
    },
};


let gamesList = companyData["Square Enix"].games.map(game => game.name).join(", ");

console.log(`${companyData["Square Enix"].name} has published ${gamesList}.`)