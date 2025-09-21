import { ICheck } from "./ICheck.js";
import { splitWords } from "../helpers/stringHelpers.js";
import { adverbs } from "../data/adverbs.js"

export class OverusedAdverbs extends ICheck {
    message = 'No overused adverbs';
    style = 'notice';

    counts = {}
    minCount = 2;

    isInParagraph(paragraph) {
        return true;
    }

    isInAnyParagraph(paragraphs) {
        this.counts = {}
        for (let paragraph of paragraphs) {
            for (const adverb of adverbs) {
                const regex = new RegExp(adverb, 'gi');
                let matchCount = (paragraph.match(regex) || []).length;
                this.counts[adverb] = this.counts[adverb] || 0;
                this.counts[adverb] += matchCount;
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
