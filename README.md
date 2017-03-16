# DiUS Tennis Exercise

## DiUS Tennis API

#### Create a tennis match

```javascript
const tennisMatch = diusTennis.createTennisMatch(player_1, player_2)
```
`player_1` and `player_2` are strings. Support for objects will enabled in a future release.

Example

```javascript
const diusTennis = require("../app/index")

const player_1 = "Bob"
const player_2 = "John"

const tennisMatch = diusTennis.createTennisMatch(player_1, player_2)
```
#### Player wins a point

```javascript
const updatedMatch = playerWonPoint(playerName)(tennisMatch)
```

`playerWonPoint` accepts `playerName` and `tennisMatch` as arguments. It does NOT mutate the passed-in `tennisMatch`. 
It returns new and updated `tennisMatch`.

Example

```javascript
const diusTennis = require("../app/index")

const player_1 = "Adam"
const player_2 = "David"

const tennisMatch = diusTennis.createTennisMatch(player_1, player_2)

const afterPointWon = diusTennis.playerWonPoint(player_1)(tennisMatch)

```
#### Get the score

```javascript
const score = getScore(tennisMatch)
```

`getScore` accepts `tennisMatch` as an argument and returns the `score` as a string.

Example

```javascript
const diusTennis = require("../app/index")

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

// Prints "Adam-David, sets: 0-0, games: 0-0, points: 30-30"
const afterPointWon_4 = diusTennis.playerWonPoint(player_2)(afterPointWon_3)
console.log(diusTennis.getScore(afterPointWon_4))

// Prints "Adam-David, sets: 0-0, games: 0-0, points: 40-30"
const afterPointWon_5 = diusTennis.playerWonPoint(player_1)(afterPointWon_4)
console.log(diusTennis.getScore(afterPointWon_5))

// Prints "Adam-David, sets: 0-0, games: 0-0, points: DEUCE"
const afterPointWon_6 = diusTennis.playerWonPoint(player_2)(afterPointWon_5)
console.log(diusTennis.getScore(afterPointWon_6))

// Prints "Adam-David, sets: 0-0, games: 0-0, points: ADVANTAGE Adam"
const afterPointWon_7 = diusTennis.playerWonPoint(player_1)(afterPointWon_6)
console.log(diusTennis.getScore(afterPointWon_7))

// Prints "Adam-David, sets: 0-0, games: 1-0, points: 0-0"
const afterPointWon_8 = diusTennis.playerWonPoint(player_1)(afterPointWon_7)
console.log(diusTennis.getScore(afterPointWon_8))

```

## Testing

Fetch the dev dependencies

```bash
npm install
```
Execute the test suite

```bash
npm test
```