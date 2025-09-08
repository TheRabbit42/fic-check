import { ICheck } from "./ICheck.js";

export class UnsmoothAttribution extends ICheck {
    message = 'No awkward attributions';
    style = 'warning';
    
    regex = /[?!]" [A-Z][ A-z]+ (said|asked)/g;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
