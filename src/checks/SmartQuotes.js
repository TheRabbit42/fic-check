import { ICheck } from "./ICheck.js";

export class SmartQuotes extends ICheck {
    id = "accent"
    message = 'Text free of smart quotes';
    style = 'error';

    regex = /[‘’’“”]/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length % 2 > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span class="anchor-offset" id="${this.id}"></span><span class="highlight-${this.style}">$&</span>`);
    }
}
