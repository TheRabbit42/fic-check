import { ICheck } from "./ICheck.js";

export class SmartQuotes extends ICheck {
    message = 'No smart quotes';
    style = 'error';

    regex = /[‘’’“”]/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
