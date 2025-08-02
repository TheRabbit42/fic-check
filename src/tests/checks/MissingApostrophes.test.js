import { describe, it, expect } from "vitest";
import { MissingApostrophes } from "../../checks/MissingApostrophes.js";

describe("MissingApostrophes", () => {
    const check = new MissingApostrophes();

    check.words.forEach((word) => {
        it(`detects ${word} in paragraphs`, () => {
            const text = `Sentence with ${word} in it.`;
            expect(check.isInParagraph(text)).toBe(true);
        });
    })

    it(`ignores sentences with correct apostrophes`, () => {
        const text = `Sentence without apostrophes in it.`;
        expect(check.isInParagraph(text)).toBe(false);
    });
});
