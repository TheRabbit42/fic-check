import { describe, it, expect } from "vitest";
import { FinalPunctuation } from "../../checks/FinalPunctuation.js";

describe("FinalPunctuation", () => {
    const check = new FinalPunctuation();

    it(`detects paragraphs ending with nothing`, () => {
        const text = `Sentence without final punctuation`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects paragraphs ending with invalid punctuation`, () => {
        expect(check.isInParagraph(`"Final comma in a quote,"`)).toBe(true);
        expect(check.isInParagraph(`"Final punctuation missing in a quote"`)).toBe(true);
    });

    it(`ignores valid paragraphs`, () => {
        expect(check.isInParagraph(`A valid paragraph.`)).toBe(false)
        expect(check.isInParagraph(`A valid paragraph?`)).toBe(false)
        expect(check.isInParagraph(`A valid paragraph!`)).toBe(false)
        expect(check.isInParagraph(`A valid paragraph...`)).toBe(false)
        expect(check.isInParagraph(`A valid paragraph—`)).toBe(false)
        expect(check.isInParagraph(`A valid paragraph:`)).toBe(false)

        expect(check.isInParagraph(`"A valid quote."`)).toBe(false)
        expect(check.isInParagraph(`"A valid quote?"`)).toBe(false)
        expect(check.isInParagraph(`"A valid quote!"`)).toBe(false)
        expect(check.isInParagraph(`"A valid quote..."`)).toBe(false)
        expect(check.isInParagraph(`"A valid quote—"`)).toBe(false)
        expect(check.isInParagraph(`"A valid quote:"`)).toBe(false)
    });
});
