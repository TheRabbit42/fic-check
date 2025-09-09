import { describe, it, expect } from "vitest";
import { countWords, splitWords, stripHtml } from "../../helpers/stringHelpers.js";

describe("countWords", () => {
    it('counts simple sentences', () => {
        const text = 'This is a test sentence.';
        expect(countWords(text)).toEqual(5);
    });

    it('ignores isolated html tags', () => {
        const text = 'This is a <em>test</em> sentence.';
        expect(countWords(text)).toEqual(5);
    });

    it('splits on abutting html tags', () => {
        const text = "This is a <em>cat</em>astrophe!";
        expect(countWords(text)).toEqual(5);
    });

    it('does not split on underscores', () => {
        const text = 'Some text_with_underscores are one word.';
        expect(countWords(text)).toEqual(5);
    });

    it('does not split on hyphens', () => {
        const text = 'Some text-with-hyphens are one word.';
        expect(countWords(text)).toEqual(5);
    });

    it('splits words on commas', () => {
        const text = '"Very cool," said Adrien.';
        expect(countWords(text)).toEqual(4);
    });

    it('splits words on em dashes', () => {
       const text = 'Some punctuation—like em dashes— are delimiters.';
       expect(countWords(text)).toEqual(7);
    });

    it('handles paragraphs', () => {
        const text = '' +
            'This is a test.\n\n' +
            'With multiple paragraphs.\n\n' +
            'Okay?';
        expect(countWords(text)).toEqual(8);
    });
});

describe("splitWords", () => {
    it('ignores whitespace', () => {
        const text = '   Text with     words\n\n in     it.    ';
        const expectedOutput = ['Text', 'with', 'words', 'in', 'it'];
        expect(splitWords(text)).toEqual(expectedOutput);
    });

   it('handles html', () => {
       const text = 'Text with <em>html</em> in it.';
       const expectedOutput = ['Text', 'with', 'html', 'in', 'it'];
       expect(splitWords(text)).toEqual(expectedOutput);
   });

    it('handles dashes', () => {
        const text = 'Text—with—dashes.';
        const expectedOutput = ['Text', 'with', 'dashes'];
        expect(splitWords(text)).toEqual(expectedOutput);
    });
});

describe("stripHtml", () => {
    it('strips tags with text inside', () => {
        const text = "This is <em>so</em> embarrassing";
        expect(stripHtml(text)).toEqual('This is so embarrassing');
    });

    it('strips tags abutting words', () => {
        const text = "This is a <em>cat</em>astrophe!";
        expect(stripHtml(text)).toEqual('This is a cat astrophe!');
    });

    it('strips self-closing tags', () => {
        const text = "This is <hr/> embarrassing";
        expect(stripHtml(text)).toEqual('This is embarrassing');
    });

    it('strips tags with attributes', () => {
        const text = "This is <em class='what'>so</em> embarrassing";
        expect(stripHtml(text)).toEqual('This is so embarrassing');
    });
});
