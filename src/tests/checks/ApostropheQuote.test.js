import { describe, it, expect } from "vitest";
import { ApostropheQuote } from "../../checks/ApostropheQuote.js";

describe("ApostropheQuote", () => {
    const check = new ApostropheQuote();

    it(`detects apostrophes next to quotes`, () => {
        expect(check.isInParagraph(`"Apostrophe before closing 'quote'"`)).toBe(true);
        expect(check.isInParagraph(`"'Apostrophe' after opening quote"`)).toBe(true);
    });

    it(`ignores other single quotes inside a quotes`, () => {
        const text1 = `Quote with 'subquote' in it.`;
        expect(check.isInParagraph(text1)).toBe(false);
    });
});
