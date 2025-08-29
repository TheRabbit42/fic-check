import { ICheck } from "./ICheck.js";

export class RepeatWords extends ICheck {
    id = "repeatword"
    message = 'Text free of repeat words';
    style = 'warning';

    isInParagraph(paragraph) {
        let lastWord = null;
        for (const word of paragraph.split(' ')) {
            if (word === lastWord) {
                return true;
            }
            lastWord = word;
        }
        return false;
    }

    render(paragraph) {
        return `<mark class="anchor-offset" id="${this.id}"></mark><mark class="highlight-${this.style}">${paragraph}</mark>`;
    }
}
