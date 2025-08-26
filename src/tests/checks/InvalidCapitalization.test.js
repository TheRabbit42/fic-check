import { describe, it, expect } from "vitest";
import { InvalidCapitalization } from "../../checks/InvalidCapitalization.js";

describe("InvalidCapitalization", () => {
    const check = new InvalidCapitalization();

    it(`detects paragraphs starting with a lowercase`, () => {
        const text = `paragraph starting with a lowercase.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects sentences starting with a lowercase`, () => {
        const text = `Sentence. another sentence.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects multiple violations`, () => {
        const text = `Sentence. another sentence. and another.`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects double punctuation` , () => {
        expect(check.isInParagraph(`What?! no...`)).toBe(true);
    });

    it(`detects numbers`, () => {
        const valid_sentences = [
            `1? Try 2. yay`,
        ]
        valid_sentences.forEach((text) => {
            expect(check.isInParagraph(text)).toBe(true);
        });
    });

    it(`ignores quotations`, () => {
        const valid_sentences = [
            `"Yay..." Marinette said.`,
            `"Yay..." said Marinette.`,
            `"Yay," Marinette said.`,
            `"Yay," said Marinette.`,
            `"Yay!" Marinette said.`,
            `"Yay!" said Marinette.`,
            `"Yay?" Marinette said.`,
            `"Yay?" said Marinette.`
        ]
        valid_sentences.forEach((text) => {
            expect(check.isInParagraph(text)).toBe(false);
        });
    });

    it(`ignores ellipses`, () => {
        expect(check.isInParagraph(`The idea... was bad.`)).toBe(false);
    });

    it(`ignores colons`, () => {
        expect(check.isInParagraph(`The idea: to do nothing.`)).toBe(false);
    });

    it(`ignores semicolons`, () => {
        expect(check.isInParagraph(`"It wasn't a problem; that's just how it is sometimes.`)).toBe(false);
        expect(check.isInParagraph(`"It wasn't a problem; Marinette was fine.`)).toBe(false);
    });

    it(`ignores valid sentences`, () => {
        expect(check.isInParagraph(`One sentence. And another.`)).toBe(false);
        expect(check.isInParagraph(`One sentence, then another.`)).toBe(false);
    });
});
