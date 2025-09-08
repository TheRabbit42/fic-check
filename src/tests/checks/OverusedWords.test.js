import { describe, it, expect } from "vitest";
import { OverusedWords } from "../../checks/OverusedWords.js";

describe("OverusedWords", () => {
    const check = new OverusedWords();

    it(`detects disallowed words`, () => {
        const paragraphs = [
            'A sentence with a non-allow-listed word.',
            'A sentence with a non-allow-listed word.',
            'A sentence with a non-allow-listed word.',
            'A sentence with a non-allow-listed word.',
            'A sentence with a non-allow-listed word.',
            'A sentence with a non-allow-listed word.',
            'A sentence with a non-allow-listed word.',
        ];
        expect(check.isInAnyParagraph(paragraphs)).toBe(true);
    });

    it(`ignores allowed words`, () => {
        const paragraphs = [
            'A sentence with no overused words.',
        ];
        expect(check.isInAnyParagraph(paragraphs)).toBe(false);
    });
});
