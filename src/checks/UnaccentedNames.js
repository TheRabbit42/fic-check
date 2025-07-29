import { ICheck } from "./ICheck.js";

export class UnaccentedNames extends ICheck {
    id = 'unaccent'
    message = 'All paragraphs free of unaccented names';
    style = 'error';

    accentedWords = [
        'Chloe', 'Cesaire', 'Mylene', 'Emilie', 'Felix',
        'Zoe', 'Kante', 'Haprele', 'Andre', 'Amelie'
    ];

    isInParagraph(paragraph) {
        return this.accentedWords.some((word) => {
            return (paragraph.match(word) || []).length > 0;
        });
    }

    render(paragraph) {
        for (let word of this.accentedWords) {
            paragraph = paragraph.replace(word, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
        }
        return paragraph;
    }
}
