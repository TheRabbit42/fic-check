import { ICheck } from "./ICheck.js";

export class QuoteSpacing extends ICheck {
    id = 'quotespacing';
    message = 'Text free of incorrect quote spacing';
    style = 'error';

    regex = /(^"\s)|(\s"\s)|(\s"$)/gim;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
