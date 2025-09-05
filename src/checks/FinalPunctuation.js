import { ICheck } from "./ICheck.js";

export class FinalPunctuation extends ICheck {
    id = "finalpunc"
    message = 'Text free of invalid final punctuation';
    style = 'error';

    regex = /([^\n\r!?:—.")>]"?$)|([^\n\r!?:—.")>]"?(?:<\/?\w*\/?>"?)$)/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
