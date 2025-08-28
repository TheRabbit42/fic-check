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
        return `<span class="anchor-offset" id="${this.id}"></span><span class="highlight-${this.style}">${paragraph}</span>`;
    }
}
