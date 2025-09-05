import { ICheck } from "@/checks/ICheck.js";
import { names } from "@/data/names.js";
import { trivialWords } from "@/data/trivialWords.js";

export class OverusedWords extends ICheck {
    id = "overused"
    message = 'No overused words';
    style = 'warning';

    counts = {}
    minCount = 3;
    minLength = 5;

    isInParagraph(paragraph) {
        return true;
    }

    isInAnyParagraph(paragraphs) {
        this.counts = {}
        for (const paragraph of paragraphs) {
            let words = paragraph.split(' ')

            for (const word of words) {
                const word2 = word.toLowerCase().replace(/[^A-Za-z0-9]/g, '')
                if (!(word2.endsWith('ly') || word2.endsWith('ic') || word2.endsWith('y'))) continue;
                if (word2.length < this.minLength) continue;
                if (names.includes(word2)) continue;
                if (trivialWords.includes(word2)) continue;

                this.counts[word2] = this.counts[word2] || 0;
                this.counts[word2] += 1;
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
