import { describe, it, expect } from "vitest";
import { InvalidHtml } from "../../checks/InvalidHtml.js";

describe("InvalidHtml", () => {
    const check = new InvalidHtml();

    it(`detects malformed open tag`, () => {
        const text = `<>emphasis!`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    it(`detects malformed closing tag`, () => {
        const text = `emphasis!</>`;
        expect(check.isInParagraph(text)).toBe(true);
    });

    check.tags.forEach((tag) => {
        it(`detects unopened ${tag} tag`, () => {
            const text = `<${tag}>emphasis!`;
            expect(check.isInParagraph(text)).toBe(true);
        });

        it(`detects unclosed ${tag} tag`, () => {
            const text = `emphasis!</${tag}>`;
            expect(check.isInParagraph(text)).toBe(true);
        });

        it(`detects duplicate opening ${tag} tags`, () => {
            const text = `<${tag}>emphasis!<${tag}>`;
            expect(check.isInParagraph(text)).toBe(true);
        });

        it(`detects duplicate closing ${tag} tags`, () => {
            const text = `</${tag}>emphasis!</${tag}>`;
            expect(check.isInParagraph(text)).toBe(true);
        });
    })
});
