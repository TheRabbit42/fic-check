import { describe, it, expect } from "vitest";
import { MissingApostrophes } from "../../checks/MissingApostrophes.js";

describe("MissingApostrophes", () => {
    const check = new MissingApostrophes();

    check.words.forEach((word) => {
        it(`detects ${word} at the start of sentences`, () => {
            const text = `${word} at start of Sentence.`;
            expect(check.isInParagraph(text)).toBe(true);
        });

        it(`detects ${word} in sentences`, () => {
            const text = `Sentence with ${word} in it.`;
            expect(check.isInParagraph(text)).toBe(true);
        });

        it(`detects ${word} at the end of sentences`, () => {
            const text = `Sentence ends with ${word}.`;
            expect(check.isInParagraph(text)).toBe(true);
        });

        it(`ignores ${word} at the end of sentences`, () => {
            const text = `Sentence with con${word}containing.`;
            expect(check.isInParagraph(text)).toBe(false);
        });
    })

    it(`ignores sentences with correct apostrophes`, () => {
        const text = `Sentence without apostrophes in it.`;
        expect(check.isInParagraph(text)).toBe(false);
    });

    it(`ignores sentences with apostrophe words embedded in other words`, () => {
        const text = `Sentence without a significant bug.`;
        expect(check.isInParagraph(text)).toBe(false);
    });
});
