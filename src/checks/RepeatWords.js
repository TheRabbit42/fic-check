import { ICheck } from "@/checks/ICheck.js";

export class RepeatWords extends ICheck {
    id = "repeatword"
    message = 'All paragraphs free of repeat words';
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
        return `<span id="${this.id}" class="highlight-${this.style}">${paragraph}</span>`;
    }
}
