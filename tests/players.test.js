import {Game} from "../game.js";

describe('players', () => {
    it('should place players on random positions', () => {
        const game = new Game();
        game.start();

        const pos1 = game.firstPlayerPosition;
        const pos2 = game.secondPlayerPosition;

        expect(pos1.x).toBeLessThan(game.gridSize.columnsCount);
        expect(pos1.x).toBeGreaterThanOrEqual(0);
        expect(pos1.y).toBeLessThan(game.gridSize.rowsCount);
        expect(pos1.y).toBeGreaterThanOrEqual(0);

        expect(pos2.x).toBeLessThan(game.gridSize.columnsCount);
        expect(pos2.x).toBeGreaterThanOrEqual(0);
        expect(pos2.y).toBeLessThan(game.gridSize.rowsCount);
        expect(pos2.y).toBeGreaterThanOrEqual(0);
    });

    it('should place players on different positions', () => {
        const game = new Game();
        game.start();

        const pos1 = game.firstPlayerPosition;
        const pos2 = game.secondPlayerPosition;
        expect(pos1).not.toEqual(pos2);
    });

    it('should place Google on different position than players', () => {
        const game = new Game();
        game.start();

        const googlePos = game.googlePosition;
        const player1Pos = game.firstPlayerPosition;
        const player2Pos = game.secondPlayerPosition;

        expect(googlePos).not.toEqual(player1Pos);
        expect(googlePos).not.toEqual(player2Pos);
    });
});