import { describe, it, expect } from "vitest";
import { RepeatWords } from "../../checks/RepeatWords.js";

describe("RepeatWords", () => {
    const check = new RepeatWords();

    it(`detects repeat words`, () => {
        const text = `Sentence with repeat repeat repeat words.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`is case-insensitive`, () => {
        const text = `Sentence with repeat repEAT REPEAT words.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`ignores html repeat words`, () => {
        const text = `Sentence with <em>repeat</em> repeat repeat words.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`ignores non repeat words`, () => {
        const text = `Sentence with no repeat words.`;
        expect(check.isInParagraph(text)).toBe(false);
    });
});
