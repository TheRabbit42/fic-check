import { ICheck } from "./ICheck.js";

export class FinalPunctuation extends ICheck {
    message = 'No missing final punctuation';
    style = 'error';

    regex = /([^\n\r!?:—.")>\s]"?$)|([^\n\r!?:—.")>\s]"?(?:<\/?\w*\/?>"?)$)/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
