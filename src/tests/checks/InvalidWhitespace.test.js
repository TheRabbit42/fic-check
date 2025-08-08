import { describe, it, expect } from "vitest";
import { InvalidWhitespace } from "../../checks/InvalidWhitespace.js";

describe("InvalidWhitespace", () => {
    const check = new InvalidWhitespace();

    it(`detects missing whitespace after period`, () => {
        const text = `"Sentence with.And more`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects missing whitespace after commas`, () => {
        const text = `"Sentence with,and more.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects missing whitespace after exclamation point`, () => {
        const text = `"Sentence with!And more.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects missing whitespace after question mark`, () => {
        const text = `"Sentence with?And more.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects extra whitespace`, () => {
        const text = `"Sentence with  repeat whitespace. Sentence with proper whitespace.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`ignores normal whitespace`, () => {
        const text = `"Sentence with proper whitespace. Sentence with proper whitespace."`;
        expect(check.isInParagraph(text)).toBe(false);
    });
});
