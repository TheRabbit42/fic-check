import { ICheck } from "./ICheck.js";

export class RepeatWords extends ICheck {
    id = "repeatword"
    message = 'No repeat words';
    style = 'warning';

    isInParagraph(paragraph) {
        let lastWord = null;
        for (const word of paragraph.replace(/[^a-z ]/i,'').split(' ')) {
            if (word === lastWord) {
                return true;
            }
            lastWord = word;
        }
        return false;
    }

    renderParagraph(paragraph) {
        if (!this.isInParagraph(paragraph)) { return paragraph; }

        return `<a href="#" id="${this.id}-${this.matchCount++}" class="highlight highlight-${this.style}">${paragraph}</a>`;
    }
}
