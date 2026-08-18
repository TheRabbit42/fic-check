import { ICheck } from "./ICheck.js";
import { speakingVerbs } from "../data/speakingVerbs.js";

export class UnsmoothAttribution extends ICheck {
    message = 'No awkward attributions';
    style = 'warning';
    regex = new RegExp(`[?!]" [A-Z][ A-Za-z]+ (${ speakingVerbs.join('|')})`, 'g');

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
