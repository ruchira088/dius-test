const {assert} = require("chai")
const testData = require("./testData.json")
const {
    playerWonPoint,
    createTennisMatch,
    getScore,
    testing
} = require("../app/index")

describe("DiUS test suite", () => {
    describe("Testing helper functions", () => {
        const testRunner = func => {
            const functionName = func.name

            describe(functionName, () => {
                testData[functionName].forEach(({inputs, output}) => {
                    it("Passed", () => {
                        assert.deepEqual(func(inputs), output)
                    })
                })
            })
        }

        Object.keys(testing).forEach(key => {
            testRunner(testing[key])
        })
    })

    describe("Testing createTennisMatch", () => {
        const TEST_VALUES = [
            {
                inputs: [{name: "Adam"}, {name: "Bob"}],
                output: {
                    players: {
                        player_1: {name: "Adam"},
                        player_2: {name: "Bob"}
                    },
                    score: {
                        player_1: {
                            sets: 0,
                            games: 0,
                            points: 0,
                            tieBreak: 0
                        },
                        player_2: {
                            sets: 0,
                            games: 0,
                            points: 0,
                            tieBreak: 0
                        }
                    }
                }
            },
            {
                inputs: ["John", "Smith"],
                output: {
                    players: {
                        player_1: "John",
                        player_2: "Smith"
                    },
                    score: {
                        player_1: {
                            sets: 0,
                            games: 0,
                            points: 0,
                            tieBreak: 0
                        },
                        player_2: {
                            sets: 0,
                            games: 0,
                            points: 0,
                            tieBreak: 0
                        }
                    }
                }
            }
        ]

        TEST_VALUES.forEach(({inputs, output}) => {
            it("Passed", () => {
                assert.deepEqual(createTennisMatch.apply(null, inputs), output)
            })
        })
    })

    describe("Testing playerWonPoint", () => {
        const TEST_VALUES = [{
                player: "Doe",
                match: {
                    players: {
                        player_1: "John",
                        player_2: "Doe"
                    },
                    score: {
                        player_1: { sets: 0, games: 0, points: 0, tieBreak: 0 },
                        player_2: { sets: 0, games: 0, points: 0, tieBreak: 0 }
                    }
                },
                output: {
                    players: {
                        player_1: "John",
                        player_2: "Doe"
                    },
                    score: {
                        player_1: { sets: 0, games: 0, points: 0, tieBreak: 0 },
                        player_2: { sets: 0, games: 0, points: 15, tieBreak: 0 }
                    }
                }
            },
            {
                player: "John",
                match: {
                    players: {
                        player_1: "John",
                        player_2: "Doe"
                    },
                    score: {
                        player_1: { sets: 0, games: 6, points: 40, tieBreak: 0 },
                        player_2: { sets: 0, games: 5, points: 30, tieBreak: 0 }
                    }
                },
                output: {
                    players: {
                        player_1: "John",
                        player_2: "Doe"
                    },
                    score: {
                        player_1: { sets: 1, games: 0, points: 0, tieBreak: 0 },
                        player_2: { sets: 0, games: 0, points: 0, tieBreak: 0 }
                    }
                }
            }
        ]

        TEST_VALUES.forEach(({player, match, output}) => {
            it("Passed", () => {
                assert.deepEqual(playerWonPoint(player)(match), output)
            })
        })
    })

    describe("Testing getScore", () => {
        const TEST_VALUES = [
            {
                input: {
                    players: {
                        player_1: "John",
                        player_2: "Doe"
                    },
                    score: {
                        player_1: { sets: 1, games: 0, points: 0, tieBreak: 0 },
                        player_2: { sets: 0, games: 0, points: 0, tieBreak: 0 }
                    }
                },
                output: "John-Doe, sets: 1-0, games: 0-0, points: 0-0"
            },
            {
                input: {
                    players: {
                        player_1: "John",
                        player_2: "Doe"
                    },
                    score: {
                        player_1: { sets: 1, games: 6, points: 0, tieBreak: 0 },
                        player_2: { sets: 0, games: 6, points: 0, tieBreak: 4 }
                    }
                },
                output: "John-Doe, sets: 1-0, games: 6-6, tieBreak: 0-4"
            },
            {
                input: {
                    players: {
                        player_1: "John",
                        player_2: "Doe"
                    },
                    score: {
                        player_1: { sets: 1, games: 5, points: 40, tieBreak: 0 },
                        player_2: { sets: 0, games: 5, points: 40, tieBreak: 0 }
                    }
                },
                output: "John-Doe, sets: 1-0, games: 5-5, points: DEUCE"
            },
            {
                input: {
                    players: {
                        player_1: "John",
                        player_2: "Doe"
                    },
                    score: {
                        player_1: { sets: 1, games: 5, points: "ADVANTAGE", tieBreak: 0 },
                        player_2: { sets: 0, games: 5, points: 40, tieBreak: 0 }
                    }
                },
                output: "John-Doe, sets: 1-0, games: 5-5, points: ADVANTAGE John"
            }
        ]

        TEST_VALUES.forEach(({input, output}) => {
            it(output, () => {
                assert.equal(getScore(input), output)
            })
        })
    })
})