import {GameStatuses} from "./gameStatuses.js";
import {numberUtility} from "./number-utility.js";

export class Game {
    #settings = {
        gridSize: {
            columnsCount: 4,
            rowsCount: 4,
        },
        googleJumpInterval: 1000
    }
    #status = GameStatuses.PENDING
    #googlePosition = {
        x: 0,
        y: 0
    }
    #numberUtility

    constructor() {
        this.#numberUtility = new numberUtility()
    }

    get googlePosition() {
        return this.#googlePosition;
    }

    get status() {
        return this.#status;
    }

    get gridSize() {
        return this.#settings.gridSize;
    }

    start() {
        this.#status = GameStatuses.IN_PROGRESS;
        this.#jumpGoogle()
        setInterval(() => {
            this.#jumpGoogle()
        }, this.#settings.jumpInterval)
    }

    #jumpGoogle() {
        const newPosition = {
            x: this.#numberUtility.getRandomInt(0, this.#settings.gridSize.columnsCount),
            y: this.#numberUtility.getRandomInt(0, this.#settings.gridSize.rowsCount),
        }
        if (newPosition.x === this.#googlePosition.x && newPosition.y === this.#googlePosition.y) {
            this.#jumpGoogle()
            return
        }
        this.#googlePosition = newPosition
    }

    set googleJumpInterval (value) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new Error("Google Jump Interval should be an integer");
        }
        this.#settings.googleJumpInterval = value
    }

    get googleJumpInterval () {
        return this.#settings.googleJumpInterval;
    }

}
