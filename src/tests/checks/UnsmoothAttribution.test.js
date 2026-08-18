import { describe, it, expect } from "vitest";
import { UnsmoothAttribution } from "../../checks/UnsmoothAttribution.js";
import { speakingVerbs } from "../../data/speakingVerbs.js";

describe("UnsmoothAttribution", () => {
    const check = new UnsmoothAttribution();

    speakingVerbs.forEach((verb) => {
        ['?', '!'].forEach((quoteEnder) => {
            it(`detects with ${quoteEnder}, name, ${verb}`, () => {
                const text = `"Gah${quoteEnder}" Marinette ${verb}.`;
                expect(check.isInParagraph(text)).toBe(true);
            });
        });
    });

    speakingVerbs.forEach((verb) => {
        ['?', '!'].forEach((quoteEnder) => {
            it(`ignores with ${quoteEnder}, ${verb}, name`, () => {
                const text = `"Gah${quoteEnder}" ${verb} Marinette.`;
                expect(check.isInParagraph(text)).toBe(false);
            });
        });
    });
});
