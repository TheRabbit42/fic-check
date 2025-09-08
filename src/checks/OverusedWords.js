import { ICheck } from "./ICheck.js";
import { names } from "../data/names.js";
import { trivialWords } from "../data/trivialWords.js";

export class OverusedWords extends ICheck {
    id = "OverusedWords"
    message = 'No overused words';
    style = 'warning';

    counts = {}
    minCount = 5;
    minLength = 5;

    isInParagraph(paragraph) {
        return true;
    }

    isInAnyParagraph(paragraphs) {
        this.counts = {}
        for (const paragraph of paragraphs) {
            let words = paragraph.split(' ')

            for (let word of words) {
                word = word.toLowerCase().replace(/[.,":;?!]/, '');
                if (word.length < this.minLength) continue;
                if (names.includes(word)) continue;
                if (trivialWords.includes(word)) continue;

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
        const output = filtered.map(([word, count]) => `<li>${word}: ${count}</li>`);
        return `<ul>${output.join('')}</ul>`;
    }
}
