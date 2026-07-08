import {Position} from "../position.js";

describe('position', () => {
    it('should create position with x and y', () => {
        const pos = new Position(2, 3);
        expect(pos.x).toBe(2);
        expect(pos.y).toBe(3);
    });

    it('should return true when positions are equal', () => {
        const pos1 = new Position(2, 3);
        const pos2 = new Position(2, 3);
        expect(pos1.equals(pos2)).toBe(true);
    });

    it('should return false when positions are not equal', () => {
        const pos1 = new Position(2, 3);
        const pos2 = new Position(5, 1);
        expect(pos1.equals(pos2)).toBe(false);
    });
});