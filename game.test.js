import {Game} from "./game.js";
import {GameStatuses} from "./gameStatuses.js";

describe('game', () => {
    it('should have Pending status after creating', () => {
        const game = new Game();
        expect(game.status).toBe(GameStatuses.PENDING);
    })
    it('should have InProgress status after start', () => {
        const game = new Game();
        game.start();
        expect(game.status).toBe(GameStatuses.IN_PROGRESS);
    })
    it('google should be in the Grid after start', () => {
        const game = new Game();
        game.start();
        expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnsCount);
        expect(game.googlePosition.x).toBeGreaterThanOrEqual(0);
        expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount);
        expect(game.googlePosition.y).toBeGreaterThanOrEqual(0)
    })
    it('google should be in a new position after jump ', async () => {
        const game = new Game();
        game.googleJumpInterval = 10
        game.start();
        const prevGooglePosition = game.googlePosition;
        await delay(10)
        const currGooglePosition = game.googlePosition;
        expect(prevGooglePosition).not.toEqual(currGooglePosition);
    })
    it('google jump interval should be an integer ans positive', () => {
        const game = new Game();
        game.googleJumpInterval = 2000
        expect(game.googleJumpInterval).toBe(2000)
    })
    it('should throw error', () => {
        const game = new Game();
        expect(() => {
            game.googleJumpInterval = -1000;
        }).toThrow(Error);
    });
})

const delay = (ms) => {
    return new Promise((res) => setTimeout(res, ms))
}