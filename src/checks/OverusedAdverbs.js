import { ICheck } from "./ICheck.js";
import { splitWords } from "../helpers/stringHelpers.js";

export class OverusedAdverbs extends ICheck {
    message = 'No overused adverbs';
    style = 'notice';

    counts = {}
    minCount = 2;
    minLength = 4;
    allowList = [
        'away',
        'lady',
        'only',
        'play',
        'they', 'today',
    ];
    wordEndings = ['ly', 'ic', 'y'];

    isInParagraph(paragraph) {
        return true;
    }

    isInAnyParagraph(paragraphs) {
        this.counts = {}
        for (let paragraph of paragraphs) {
            for (let word of splitWords(paragraph)) {
                if (!(this.wordEndings.some((ending) => word.endsWith(ending)))) continue;
                if (word.length < this.minLength) continue;
                if (this.allowList.includes(word)) continue;

                this.counts[word] = this.counts[word] || 0;
                this.counts[word] += 1;
            }
        }
        const filtered = Object.entries(this.counts).filter(([word, count]) => count >= this.minCount)
        return filtered.length > 0;
    }

    renderParagraph(paragraph) {
        const filtered = Object.entries(this.counts)
            .filter(([word, count]) => count >= this.minCount)
            .map(([word, count]) => word);
        if (filtered.length === 0) return paragraph;

        const joined = filtered.join('|');
        const regex = new RegExp(`\\b(${joined})\\b`, 'gi');
        return paragraph.replace(regex, (match) => this.genericHighlight(match));
    }

    renderAdditional() {
        const filtered = Object.entries(this.counts).filter(([word, count]) => count >= this.minCount)
        const output = filtered.sort().map(([word, count]) => `<li>${word}: ${count}</li>`);
        return `<ul>${output.join('')}</ul>`;
    }
}
