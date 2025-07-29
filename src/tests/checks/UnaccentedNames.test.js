import { describe, it, expect } from "vitest";
import { UnaccentedNames } from "../../checks/UnaccentedNames.js";

describe("UnaccentedNames", () => {
    const check = new UnaccentedNames();

    check.accentedWords.forEach((word) => {
        it(`detects ${word} in paragraphs`, () => {
            const text = `Sentence with ${word} in it.`;
            expect(check.isInParagraph(text)).toBe(true);
        });
    })
});
