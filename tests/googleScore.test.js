import {Game} from "../game.js";
import {GameStatuses} from "../gameStatuses.js";

describe('google score', () => {
    it('should start with 0 score', () => {
        const game = new Game();
        expect(game.googleScore).toBe(0);
    });

    it('should increase score after each jump', async () => {
        const game = new Game();
        game.googleJumpInterval = 10;
        game.start();

        await delay(50);
        game.stop();

        expect(game.googleScore).toBeGreaterThan(0);
    });

    it('should stop game when google reaches 5 points', async () => {
        const game = new Game();
        game.googleJumpInterval = 10;
        game.start();

        await delay(200);

        expect(game.status).toBe(GameStatuses.COMPLETED);
        expect(game.googleScore).toBeGreaterThanOrEqual(5);
    });
});

const delay = (ms) => {
    return new Promise((res) => setTimeout(res, ms))
}