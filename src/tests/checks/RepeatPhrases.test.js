import { describe, it, expect } from "vitest";
import { RepeatPhrases } from "../../checks/RepeatPhrases.js";

describe("RepeatPhrases", () => {
    const check = new RepeatPhrases();

    it(`detects repeat phrases within a single paragraph`, () => {
        const paragraphs = [
            'Text with AAAA BBBB CCCC 1. And AAAA BBBB CCCC 2. Again AAAA BBBB CCCC 3. Again AAAA BBBB CCCC 4.',
        ]
        expect(check.isInAnyParagraph(paragraphs)).toBe(true);
    });

    it(`detects repeat phrases within one paragraph`, () => {
        const paragraphs = [
            'AAAA BBBB CCCC. AAAA BBBB CCCC 2. Again AAAA BBBB CCCC.',
        ]
        expect(check.isInAnyParagraph(paragraphs)).toBe(true);
    });

    it(`detects repeat phrases across multiple paragraphs`, () => {
        const paragraphs = [
            'Sentence one. Sentence with AAAA BBBB CCCC in it. Sentence three.',
            'Sentence four. Another sentence with AAAA BBBB CCCC. Sentence six.',
            'Oh look it\'s AAAA BBBB CCCC again. Sentence eight.'
        ];
        expect(check.isInAnyParagraph(paragraphs)).toBe(true);
    });

    it('ignores phrases within phrases', () => {
        const paragraphs = [
            'Sentence where AAAA BBBB CCCC.',
            'Another sentence in which AAAA BBBB CCCC.',
            'Yet another sentence but this time BAAAA BBBB CCCC.'
        ];
        expect(check.isInAnyParagraph(paragraphs)).toBe(false);
    });

    it(`ignores non repeat phrases`, () => {
        const paragraphs = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus arcu et nisl cursus, nec pretium nunc fringilla. Ut augue ex, consequat sed justo vitae, mollis placerat mi.',
            'Fusce vulputate ullamcorper risus et sollicitudin. Proin vel enim at metus rutrum tincidunt non sed augue. Integer blandit metus non augue interdum pulvinar.',
            'Nulla dignissim dolor ac mattis auctor. Integer purus odio, tempor id faucibus eu, tempus eget nibh. Pellentesque facilisis viverra viverra.'
        ];
        expect(check.isInAnyParagraph(paragraphs)).toBe(false);
    });
});
