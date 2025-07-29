import { describe, it, expect } from "vitest";
import { QuoteSpacing } from "../../checks/QuoteSpacing.js";

describe("QuoteSpacing", () => {
    const check = new QuoteSpacing();

    it(`detects space after opening quote`, () => {
        const text = `" Space after opening quote"`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects space after opening quote`, () => {
        const text = `"Space before closing quote "`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects spaces after opening quotes that aren't at the end`, () => {
        const text = `"No way " said Marinette`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects spaces before closing quotes that aren't at the end`, () => {
        const text = `She laughed. " No way."`;
        expect(check.isInParagraph(text)).toBe(true);
    });
});
