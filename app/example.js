const diusTennis = require("./index")

const player_1 = "Adam"
const player_2 = "David"

const tennisMatch = diusTennis.createTennisMatch(player_1, player_2)

// Prints "Adam-David, sets: 0-0, games: 0-0, points: 0-0"
console.log(diusTennis.getScore(tennisMatch))

// Prints "Adam-David, sets: 0-0, games: 0-0, points: 15-0"
const afterPointWon_1 = diusTennis.playerWonPoint(player_1)(tennisMatch)
console.log(diusTennis.getScore(afterPointWon_1))

// Prints "Adam-David, sets: 0-0, games: 0-0, points: 30-0"
const afterPointWon_2 = diusTennis.playerWonPoint(player_1)(afterPointWon_1)
console.log(diusTennis.getScore(afterPointWon_2))

// Prints "Adam-David, sets: 0-0, games: 0-0, points: 30-15"
const afterPointWon_3 = diusTennis.playerWonPoint(player_2)(afterPointWon_2)
console.log(diusTennis.getScore(afterPointWon_3))