import { ICheck } from "./ICheck.js";

export class InvalidCapitalization extends ICheck {
    message = 'Proper capitalization';
    style = 'error';

    regex = /(^"?[a-z])|(\w[.!?]{1,2}\s[a-z])/g;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
