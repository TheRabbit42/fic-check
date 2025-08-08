import { ICheck } from "./ICheck.js";

export class UnclosedQuotes extends ICheck {
    id = 'quote';
    message = 'Text free of unclosed quotes';
    style = 'error';

    regex = /"/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length % 2 > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
