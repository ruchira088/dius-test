const {
    GAME_POINTS,
    ADVANTAGE,
    DEUCE,
    SCORE_TYPES
} = require("./constants")

/**
 * Create a fresh score object
 */
const createFreshScore = () => Object.keys(SCORE_TYPES)
    .reduce((score, key) => Object.assign({}, score, {[SCORE_TYPES[key]]: 0}), {})

/**
 * Create a tennis match data object.
 *
 * player_1 and player_2 arguments can be any type
 *
 */
const createTennisMatch = (player_1, player_2) => ({
    players: { player_1, player_2 },
    score: {
        player_1: createFreshScore(),
        player_2: createFreshScore()
    }
})

/**
 * Gets the key of the player. (Whether it is player_1 or player_2)
 *
 * @param players: Players in the tennis match
 * @param player: The player
 * @param getName: The mapper function to match the player with the input argument (player)
 */
const getPlayerScoreKey = ({players}, player, getName = value => value) => (
    Object.keys(players).find(key => getName(players[key]) == player)
)

/**
 * Wins a point in a tie break
 */
const wonPointInTieBreak = ({winner, loser}) => {
    const {tieBreak: winnerTieBreak} = winner
    const {tieBreak: loserTieBreak} = loser

    // Check whether the winner won the set
    if(winnerTieBreak >= 6 && (winnerTieBreak-loserTieBreak) >= 1) {
        return {
            loser: Object.assign({}, loser, {tieBreak: 0, games: 0}),
            winner: Object.assign({}, createFreshScore(), {sets: winner.sets + 1})
        }
    } else {
        return {
            loser,
            winner: Object.assign({}, winner, {tieBreak: winnerTieBreak + 1})
        }
    }
}

/**
 * Wins a game
 */
const wonGame = ({winner, loser}) => {
    const {games: winnerGames = 0} = winner
    const {games: loserGames = 0} = loser

    // Check whether the winner won the set
    if(winnerGames >= 5 && (winnerGames-loserGames) >= 1) {
        return {
            winner: Object.assign({}, createFreshScore(), {sets: winner.sets + 1}),
            loser: Object.assign({}, createFreshScore(), {sets: loser.sets})
        }
    } else {
        return {
            winner: Object.assign({}, winner, {points: 0, games: winnerGames + 1}),
            loser: Object.assign({}, loser, {points: 0})
        }
    }
}

/**
 * Wins a point in the match
 */
const wonPoint = ({winner, loser}) => {
    const {points: points_1} = winner
    const {points: points_2} = loser

    const pointDiff = GAME_POINTS.indexOf(points_1) - GAME_POINTS.indexOf(points_2)

    // Check whether the score is in a tie break
    if(winner.games == 6 && loser.games == 6) {
        return wonPointInTieBreak({winner, loser})
    }

    // Check whether the winner won the game
    if(GAME_POINTS.indexOf(points_1) >= GAME_POINTS.indexOf(40) && pointDiff >= 1) {
        return wonGame({winner, loser})
    } else {

        // If the score was advantage to the loser, then it is back to deuce
        if(points_1 == 40 && points_2 == ADVANTAGE) {
            return {
                winner,
                loser: Object.assign({}, loser, {points: 40})
            }
        } else {
            return {
                loser,
                winner: Object.assign({}, winner, {points: GAME_POINTS[GAME_POINTS.indexOf(points_1) + 1]})
            }
        }
    }
}

/**
 * Gets the scores of a particular score type
 */
const getPlayerScores = match => scoreType => {
    const {player_1, player_2} = match.score

    return {
        player_1: player_1[scoreType],
        player_2: player_2[scoreType]
    }
}

/**
 * Returns true if it is a tie break and false if otherwise
 */
const isTieBreak = match => {
    const {player_1, player_2} = getPlayerScores(match)(SCORE_TYPES.GAMES)

    return player_1 == 6 && player_2 == 6
}

/**
 * Gets the tie break score
 */
const getTieBreakScore = match => {
    const tieBreak = getPlayerScores(match)(SCORE_TYPES.TIE_BREAK)

    return `${SCORE_TYPES.TIE_BREAK}: ${tieBreak.player_1}-${tieBreak.player_2}`
}

/**
 * Gets the description of game points
 */
const getPointDescription = (tennisMatch, getName = value => value) => {

    const isDeuce = ({player_1, player_2}) => player_1 == 40 && player_2 == 40

    const pointDescription = match => {
        const score = getPlayerScores(match)(SCORE_TYPES.POINTS)

        if(isDeuce(score)) {
            return DEUCE
        } else {
            const advantage = Object.keys(score).find(key => score[key] == ADVANTAGE)

            if(advantage != null) {
                return `${ADVANTAGE} ${getName(match.players[advantage])}`
            } else {
                return `${score.player_1}-${score.player_2}`
            }
        }
    }

    return `${SCORE_TYPES.POINTS}: ${pointDescription(tennisMatch)}`
}

/**
 * Gets a human readable description of the match score
 */
const getScore = (match, getName = value => value) => {

    const getScoreForType = getPlayerScores(match)

    const setScore = getScoreForType(SCORE_TYPES.SETS)
    const setScoreDescription = `${SCORE_TYPES.SETS}: ${setScore.player_1}-${setScore.player_2}`

    const gameScore = getScoreForType(SCORE_TYPES.GAMES)
    const gameScoreDescription = `${SCORE_TYPES.GAMES}: ${gameScore.player_1}-${gameScore.player_2}`

    const pointDescription = isTieBreak(match) ? getTieBreakScore(match) : getPointDescription(match)

    const {players} = match
    const playerNames = `${getName(players.player_1)}-${getName(players.player_2)}`

    return `${playerNames}, ${setScoreDescription}, ${gameScoreDescription}, ${pointDescription}`
}

/**
 * Player wins a point in the match
 */
const playerWonPoint = player => match => {
    const {score} = match

    const winnerKey = getPlayerScoreKey(match, player)
    const loserKey = Object.keys(score).find(key => key != winnerKey)

    const winnerScore = score[winnerKey]
    const loserScore = score[loserKey]

    const newScore = wonPoint({winner: winnerScore, loser: loserScore})

    return Object.assign({}, match, {
        score: {
            [winnerKey]: newScore.winner,
            [loserKey]: newScore.loser
        }
    })
}

module.exports = {
    playerWonPoint,
    createTennisMatch,
    getScore,
    testing: {
        wonPoint,
        wonGame,
        wonPointInTieBreak
    }
}