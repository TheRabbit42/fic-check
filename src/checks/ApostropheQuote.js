import { ICheck } from "./ICheck.js";

export class ApostropheQuote extends ICheck {
    id = "apostquote"
    message = 'No apostrophes beside quotes';
    style = 'error';

    regex = /('")|("')/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length % 2 > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
