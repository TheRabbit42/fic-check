import { ICheck } from "./ICheck.js";

export class InvalidPunctuation extends ICheck {
    id = "punctuation"
    message = 'Text free of invalid punctuation';
    style = 'error';

    regex = /(?<=[^\.]|\w|\b|^)(\.\.)(?=[^\.]|\w|\b|$)/g;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
