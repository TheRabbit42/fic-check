import { describe, it, expect } from "vitest";
import { OverusedAdverbs } from "../../checks/OverusedAdverbs.js";

describe("OverusedAdverbs", () => {
    const check = new OverusedAdverbs();

    it('detects multiple words regardless of commas', () => {
        const paragraphs = [`It was really, really cool!`];
        expect(check.isInAnyParagraph(paragraphs)).toBe(true);
    });

    it('detects multiple words regardless of casing', () => {
        const paragraphs = [`It was REALLY really cool!`];
        expect(check.isInAnyParagraph(paragraphs)).toBe(true);
    });

    it('detects multiple words regardless of html', () => {
        const paragraphs = [`It was <em>really</em>, really cool!`];
        expect(check.isInAnyParagraph(paragraphs)).toBe(true);
    });

    it('detects multiple words regardless of punctuation', () => {
        const paragraphs = [`It was really... really superduper!`];
        expect(check.isInAnyParagraph(paragraphs)).toBe(true);
    });

    it('detects multiple words ending in -ly', () => {
        const paragraphs = [`It was mischievously and mischievously !`];
        expect(check.isInAnyParagraph(paragraphs)).toBe(true);
    });

    it('ignores words inside other words', () => {
        const para1 = [`words both before likely unlikely and after`];
        expect(check.isInAnyParagraph(para1)).toBe(false)

        const para2 = [`words before likely unlikely`];
        expect(check.isInAnyParagraph(para2)).toBe(false);

        const para3 = [`likely unlikely with words after`];
        expect(check.isInAnyParagraph(para3)).toBe(false);

        const para4 = [`likely unlikely`];
        expect(check.isInAnyParagraph(para4)).toBe(false);
    });

    it('ignores allowed words', () => {
        const paragraphs = [`They did and they were cool!`];
        expect(check.isInAnyParagraph(paragraphs)).toBe(false);
    });
});
