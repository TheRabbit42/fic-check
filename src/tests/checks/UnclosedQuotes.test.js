import { describe, it, expect } from "vitest";
import { UnclosedQuotes } from "../../checks/UnclosedQuotes.js";

describe("UnclosedQuotes", () => {
    const check = new UnclosedQuotes();

    it(`detects unclosed quotes`, () => {
        const text = `"Sentence with unclosed quotes.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`ignores properly closed quotes`, () => {
        const text = `"Sentence with proper quoting."`;
        expect(check.isInParagraph(text)).toBe(false);
    });
});
