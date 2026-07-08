import {Game} from "../game.js";

describe('settings', () => {
    it('should use default settings', () => {
        const game = new Game();
        expect(game.settings.gridSize.columnsCount).toBe(4);
        expect(game.settings.gridSize.rowsCount).toBe(4);
        expect(game.settings.google.jumpInterval).toBe(1000);
    });

    it('should update google jump interval', () => {
        const game = new Game();
        game.googleJumpInterval = 2000;
        expect(game.googleJumpInterval).toBe(2000);
    });
});