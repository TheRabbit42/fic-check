import { ICheck } from "./ICheck.js";
import { names } from  "../data/names.js";

export class UncapitalizedNames extends ICheck {
    message = 'No lowercase names';
    style = 'error';

    isInParagraph(paragraph) {
        const joinedWords = names.join('|');
        const regex = new RegExp(`\\b(${joinedWords})\\b`, 'g');
        return (paragraph.match(regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        const joinedWords = names.join('|');
        const regex = new RegExp(`\\b(${joinedWords})\\b`, 'g');
        return paragraph.replace(regex, (match) => this.genericHighlight(match));
    }
}
