import { describe, it, expect } from "vitest";
import { FinalPunctuation } from "../../checks/FinalPunctuation.js";

describe("FinalPunctuation", () => {
    const check = new FinalPunctuation();

    it(`detects invalid endings`, () => {
        expect(check.isInParagraph(`Sentence without final punctuation`)).toBe(true);
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

        expect(check.isInParagraph(`<em>Emphasis!</em>`)).toBe(false)
        expect(check.isInParagraph(`<hr/>`)).toBe(false)
    });
});
