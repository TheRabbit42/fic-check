import { describe, it, expect } from "vitest";
import { InvalidWhitespace } from "../../checks/InvalidWhitespace.js";

describe("InvalidWhitespace", () => {
    const check = new InvalidWhitespace();

    const delimiters = ['.', ',', ';', '?', '!', ':'];
    delimiters.forEach((delimiter) => {
        it(`detects extra whitespace before delimiter`, () => {
            const text = `"Sentence with ${delimiter}And more`;
            expect(check.isInParagraph(text)).toBe(true);
        });

        it(`detects missing whitespace after delimiter`, () => {
            const text = `"Sentence with${delimiter}And more`;
            expect(check.isInParagraph(text)).toBe(true);
        });

        it(`detects invalid whitespace with a number before the delimiter.`, () => {
            const text = `"I see 2${delimiter}Not good."`;
            expect(check.isInParagraph(text)).toBe(true);
        });

        it(`detects invalid whitespace with a number after the delimiter`, () => {
            const text = `"No good${delimiter}0"`;
            expect(check.isInParagraph(text)).toBe(true);
        });
    })

    it(`detects extra whitespace`, () => {
        const text = `"Sentence with  repeat whitespace.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`ignores normal whitespace`, () => {
        const text = `"Sentence with proper whitespace. Sentence with proper whitespace."`;
        expect(check.isInParagraph(text)).toBe(false);
    });

    it(`ignores normal decimal numbers`, () => {
        const text = `"Sentence with 0.1%."`;
        expect(check.isInParagraph(text)).toBe(false);
    });
});
