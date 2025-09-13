import { describe, it, expect } from "vitest";
import { WordCount } from "../../checks/WordCount.js";

describe("WordCount", () => {
    const check = new WordCount();

    it(`detects counts within a paragraph`, () => {
        const input = { value: 'This sentence is five words.' };
        const paragraphs = [];
        const output = check.getMessage(input, paragraphs);

        expect(output.text).toBe('5 words');
    });

    it(`detects counts across paragraphs`, () => {
        const input = { value: 'This sentence is five words.\n\nAnd this is four.' };
        const paragraphs = [];
        const output = check.getMessage(input, paragraphs);

        expect(output.text).toBe('9 words');
    });
});
