import { ICheck } from "./ICheck.js";

export class UnclosedQuotes extends ICheck {
    message = 'No unclosed quotes';
    style = 'error';

    regex = /"/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length % 2 !== 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
