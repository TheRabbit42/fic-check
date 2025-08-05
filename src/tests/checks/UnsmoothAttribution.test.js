import { describe, it, expect } from "vitest";
import { UnsmoothAttribution } from "../../checks/UnsmoothAttribution.js";

describe("UnsmoothAttribution", () => {
    const check = new UnsmoothAttribution();

    it(`detects ambiguous attribution`, () => {
        const text = `"Why?" Marinette said.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects ambiguous attribution`, () => {
        const text = `"No!" Marinette said.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`ignores said after question mark`, () => {
        const text = `"Why?" said Marinette.`;
        expect(check.isInParagraph(text)).toBe(false);
    });

    it(`ignores asked after question mark`, () => {
        const text = `"Why?" asked Marinette.`;
        expect(check.isInParagraph(text)).toBe(false);
    });

    it(`ignores said after question mark`, () => {
        const text = `"Yes!" said Marinette.`;
        expect(check.isInParagraph(text)).toBe(false);
    });

    it(`ignores asked after question mark`, () => {
        const text = `"Yes?" exclaimed Marinette.`;
        expect(check.isInParagraph(text)).toBe(false);
    });
});
