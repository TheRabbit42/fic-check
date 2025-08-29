import { ICheck } from "./ICheck.js";

export class MissingApostrophes extends ICheck {
    id = 'apostrophes'
    message = 'Text free of missing apostrophes';
    style = 'error';

    words = [
        'aint',
        'cant', 'couldnt', 'couldve',
        'didnt', 'doesnt', 'dont',
        'hadnt', 'hasnt',
        'isnt',
        'mightve', 'mustnt',
        'shed', 'shouldnt',
        'thats', 'theres', 'therell', 'theyd', 'theyll', 'theyve',
        'wasnt', 'weve', 'whos', 'wont', 'wouldnt', 'wouldve'
    ];

    isInParagraph(paragraph) {
        const joinedWords = this.words.join('|');
        const regex = new RegExp(`\\b(${joinedWords})\\b`, 'gi');
        return (paragraph.match(regex) || []).length > 0;
    }

    render(paragraph) {
        for (let word of this.words) {
            paragraph = paragraph.replace(word, `<mark class="anchor-offset" id="${this.id}"></mark><mark class="highlight-${this.style}">$&</mark>`);
        }
        return paragraph;
    }
}
