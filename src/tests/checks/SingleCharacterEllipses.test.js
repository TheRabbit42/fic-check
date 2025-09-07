import { describe, it, expect } from "vitest";
import { SingleCharacterEllipses } from "../../checks/SingleCharacterEllipses.js";

describe("SingleCharacterEllipses", () => {
    const check = new SingleCharacterEllipses();

    it(`detects text with a single-ellipsis character`, () => {
        const text2 = `Sentence with… a single-ellipsis character.`;
        expect(check.isInParagraph(text2)).toBe(true);
    });

    it(`ignores text with three periods in a row`, () => {
        const text1 = `Sentence with... an ellipsis comprised of multiple periods.`;
        expect(check.isInParagraph(text1)).toBe(false);
    });
});
