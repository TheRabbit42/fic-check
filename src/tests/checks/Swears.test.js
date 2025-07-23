import { describe, it, expect } from "vitest";
import { Swears } from "../../checks/Swears.js";

describe("Swears", () => {
    const check = new Swears();

    const swears = ['bitch', 'cunt', 'fuck', 'shit'];
    swears.forEach((swear) => {
        it(`detects ${swear} in paragraphs`, () => {
            const text = `Sentence with ${swear} in it.`;
            expect(check.isInParagraph(text)).toBe(true);
        });
    })

    it(`ignores other words`, () => {
        const text = `Sentence with THING in it.`;
        expect(check.isInParagraph(text)).toBe(false);
    });
});
