import { ICheck } from "./ICheck.js";

export class UnaccentedNames extends ICheck {
    message = 'No unaccented names';
    style = 'error';

    accentedWords = [
        'Chloe', 'Cesaire', 'Mylene', 'Emilie', 'Felix',
        'Zoe', 'Kante', 'Haprele', 'Andre', 'Amelie'
    ];

    isInParagraph(paragraph) {
        const joinedWords = this.accentedWords.join('|');
        const regex = new RegExp(`\\b(${joinedWords})\\b`, 'gi');
        return (paragraph.match(regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        const joinedWords = this.accentedWords.join('|');
        const regex = new RegExp(`\\b(${joinedWords})\\b`, 'gi');
        return paragraph.replace(regex, (match) => this.genericHighlight(match));
    }
}
