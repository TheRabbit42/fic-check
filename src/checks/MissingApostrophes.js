import { ICheck } from "./ICheck.js";

export class MissingApostrophes extends ICheck {
    id = 'apostrophes'
    message = 'Text free of missing apostrophes';
    style = 'error';

    words = [
        'cant', 'couldnt', 'didnt', 'dont', 'hadnt', 'isnt',
        'mustnt', 'shouldnt', 'wasnt', 'wouldnt'
    ];

    isInParagraph(paragraph) {
        return this.words.some((word) => {
            return (paragraph.match(word) || []).length > 0;
        });
    }

    render(paragraph) {
        for (let word of this.words) {
            paragraph = paragraph.replace(word, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
        }
        return paragraph;
    }
}
