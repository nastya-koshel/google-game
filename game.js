import {GameStatuses} from "./gameStatuses.js";
import {NumberUtility} from "./number-utility.js";
import {Settings} from "./settings/settings.js";

export class Game {
    #settings
    #status = GameStatuses.PENDING
    #firstPlayerPosition = null
    #secondPlayerPosition = null
    #googlePosition = null
    #numberUtility
    #intervalId = null
    #googleScore = 0

    constructor() {
        this.#numberUtility = new NumberUtility()
        this.#settings = new Settings()
    }

    get settings() {
        return this.#settings
    }

    #getRandomPosition() {
        return {
            x: this.#numberUtility.getRandomInt(0, this.#settings.gridSize.columnsCount),
            y: this.#numberUtility.getRandomInt(0, this.#settings.gridSize.rowsCount)
        };
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

    get firstPlayerPosition() {
        return this.#firstPlayerPosition;
    }

    get secondPlayerPosition() {
        return this.#secondPlayerPosition;
    }

    get googleScore() {
        return this.#googleScore;
    }

    start() {
        this.#status = GameStatuses.IN_PROGRESS;
        this.#firstPlayerPosition = this.#getRandomPosition()
        this.#secondPlayerPosition = this.#getRandomPosition()
        while (this.#secondPlayerPosition.x === this.#firstPlayerPosition.x && this.#secondPlayerPosition.y === this.#firstPlayerPosition.y) {
            this.#secondPlayerPosition = this.#getRandomPosition()
        }

        this.#googlePosition = this.#getRandomPosition()
        while ((this.#googlePosition.x === this.#firstPlayerPosition.x && this.#googlePosition.y === this.#firstPlayerPosition.y) || (this.#googlePosition.x === this.#secondPlayerPosition.x && this.#googlePosition.y === this.#secondPlayerPosition.y)) {
            this.#googlePosition = this.#getRandomPosition();
        }

        this.#intervalId = setInterval(() => {
            this.#jumpGoogle()
        }, this.#settings.googleJumpInterval)
    }

    #jumpGoogle() {
        if (this.#status !== GameStatuses.IN_PROGRESS) {
            return;
        }
        let newPosition = this.#getRandomPosition()
        while ((newPosition.x === this.#firstPlayerPosition.x && newPosition.y === this.#firstPlayerPosition.y) || (newPosition.x === this.#secondPlayerPosition.x && newPosition.y === this.#secondPlayerPosition.y) || (newPosition.x === this.#googlePosition.x && newPosition.y === this.#googlePosition.y)) {
            newPosition = {
                x: this.#numberUtility.getRandomInt(0, this.#settings.gridSize.columnsCount),
                y: this.#numberUtility.getRandomInt(0, this.#settings.gridSize.rowsCount),
            }
        }
        this.#googlePosition = newPosition
        this.#googleScore++

        if (this.#googleScore >= 5) {
            this.#status = GameStatuses.COMPLETED;
            clearInterval(this.#intervalId);
            this.#intervalId = null;
            console.log('🎮 Google победил!');
        }
    }

    stop() {
        this.#status = GameStatuses.COMPLETED;
        if (this.#intervalId) {
            clearInterval(this.#intervalId);
            this.#intervalId = null;
        }
    }

    set googleJumpInterval(value) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new Error("Google Jump Interval should be an integer");
        }
        this.#settings.googleJumpInterval = value
    }

    get googleJumpInterval() {
        return this.#settings.googleJumpInterval;
    }
}
