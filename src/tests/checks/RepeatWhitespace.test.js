import { describe, it, expect } from "vitest";
import { RepeatWhitespace } from "../../checks/RepeatWhitespace.js";

describe("RepeatWhitespace", () => {
    const check = new RepeatWhitespace();

    it(`detects unclosed quotes`, () => {
        const text = `"Sentence with  repeat whitespace.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`ignores normal whitespace`, () => {
        const text = `"Sentence with proper whitespace."`;
        expect(check.isInParagraph(text)).toBe(false);
    });
});
