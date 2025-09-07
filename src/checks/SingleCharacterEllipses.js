import { ICheck } from "./ICheck.js";

export class SingleCharacterEllipses extends ICheck {
    id = "ellipses"
    message = 'No single-character ellipses';
    style = 'error';

    regex = /[…]/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length % 2 > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
