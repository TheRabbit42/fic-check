import { ICheck } from "./ICheck.js";

export class SmartQuotes extends ICheck {
    id = "accent"
    message = 'Text free of smart quotes';
    style = 'error';

    regex = /[‘’’“”]/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length % 2 > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
