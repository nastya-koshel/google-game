import { NumberUtility } from '../number-utility.js';

describe('numberUtility', () => {
    describe('getRandomInt', () => {
        it('should return an integer within the specified range', () => {
            const utility = new NumberUtility
            const from = 0;
            const to = 10;

            for (let i = 0; i < 100; i++) {
                const result = utility.getRandomInt(from, to);
                expect(result).toBeGreaterThanOrEqual(from);
                expect(result).toBeLessThan(to);
                expect(Number.isInteger(result)).toBe(true);
            }
        });

        it('should work with negative numbers', () => {
            const utility = new NumberUtility
            const from = -10;
            const to = -5;
            for (let i = 0; i < 50; i++) {
                const result = utility.getRandomInt(from, to);
                expect(result).toBeGreaterThanOrEqual(from);
                expect(result).toBeLessThan(to);
                expect(Number.isInteger(result)).toBe(true);
            }
        });

        it('should return the same value when range contains only one number', () => {
            const utility = new NumberUtility
            const result = utility.getRandomInt(5, 6);
            expect(result).toBe(5);
        });

        it('should return different values on multiple calls', () => {
            const utility = new NumberUtility
            const results = new Set();
            for (let i = 0; i < 50; i++) {
                results.add(utility.getRandomInt(0, 100));
            }
            expect(results.size).toBeGreaterThan(1);
        });

        it('should throw an error when fromInclusive is greater than toExclusive', () => {
            const utility = new NumberUtility
            expect(() => {
                utility.getRandomInt(5, -10);
            }).toThrow(Error);
        });
    });
});