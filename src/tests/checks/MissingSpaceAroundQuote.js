import { describe, it, expect } from "vitest";
import { InvalidWhitespaceAroundQuotes } from "../../checks/MissingSpaceAroundQuote.js";

describe("MissingSpaceAroundQuote", () => {
    const check = new MissingSpaceAroundQuote();

    it(`detects missing spaces`, () => {
        expect(check.isInParagraph('"Wait," she continued,"that is wrong.')).toBe(true);
    });
});
