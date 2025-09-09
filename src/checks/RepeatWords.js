import { ICheck } from "./ICheck.js";
import { splitWords } from "../helpers/stringHelpers.js";

export class RepeatWords extends ICheck {
    style = 'warning';

    isInParagraph(paragraph) {
        let lastWord = null;
        for (let word of splitWords(paragraph)) {
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
