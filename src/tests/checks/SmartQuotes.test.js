import { describe, it, expect } from "vitest";
import { SmartQuotes } from "../../checks/SmartQuotes.js";

describe("SmartQuotes", () => {
    const check = new SmartQuotes();

    const quotes = ['‘', '’', '’', '“', '”']

    quotes.forEach((quote) => {
        it(`ignores smart ${quotes} quote`, () => {
            const text = `Sentence with ${quote} in it.`;
            expect(check.isInParagraph(text)).toBe(true);
        });
    })

    it(`ignores non-smart single quote`, () => {
        const text2 = `Sentence with ' in it.`;
        expect(check.isInParagraph(text2)).toBe(false);
    });

    it(`ignores non-smart double quote`, () => {
        const text1 = `Sentence with " in it.`;
        expect(check.isInParagraph(text1)).toBe(false);
    });
});
