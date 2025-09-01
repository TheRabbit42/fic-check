import { ICheck } from "./ICheck.js";

export class InvalidPunctuation extends ICheck {
    id = "punctuation"
    message = 'Text free of invalid punctuation';
    style = 'error';

    regex = /[^\.]\.\.[^\.]/g;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<mark class="anchor-offset" id="${this.id}"></mark><mark class="highlight-${this.style}">$&</mark>`);
    }
}
