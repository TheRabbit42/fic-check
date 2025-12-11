import { ICheck } from "./ICheck.js";

export class GenericRegexCheck extends ICheck {
    message = 'Generic Regex Check';
    style = 'error';
    regex = null;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
