import { describe, it, expect } from "vitest";
import { IncompleteEllipses } from "../../checks/IncompleteEllipses.js";

describe("IncompleteEllipses", () => {
    const check = new IncompleteEllipses();

    it(`detects double periods`, () => {
        expect(check.isInParagraph(`Wait.. What?`)).toBe(true);
        expect(check.isInParagraph(`Wait..`)).toBe(true);
        expect(check.isInParagraph(`..What?`)).toBe(true);
    });

    it(`ignores single periods`, () => {
        expect(check.isInParagraph(`Wait. What?`)).toBe(false);
    });

    it(`ignores ellipses`, () => {
        expect(check.isInParagraph(`Wait... What?`)).toBe(false);
        expect(check.isInParagraph(`...What?`)).toBe(false);
        expect(check.isInParagraph(`Wait...`)).toBe(false);
    });
});
