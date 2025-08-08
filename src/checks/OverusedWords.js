import { ICheck } from "@/checks/ICheck.js";
import { names } from "@/data/names.js";
import { trivialWords } from "@/data/trivialWords.js";

export class OverusedWords extends ICheck {
    id = "overused"
    message = 'Text free of overused words';
    style = 'warning';

    counts = {}
    minCount = 5;
    minLength = 5;

    isInAnyParagraph(paragraphs) {
        this.counts = {}
        for (const paragraph of paragraphs) {
            let words = paragraph.split(' ')

            for (const word of words) {
                const word2 = word.toLowerCase().replace(/[^A-Za-z0-9]/g, '')
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

    render(paragraph) {
        return `<span id="${this.id}" class="highlight-${this.style}">${paragraph}</span>`;
    }

    renderAdditional() {
        const filtered = Object.entries(this.counts).filter(([word, count]) => count >= this.minCount)
        const output = filtered.map(([word, count]) => `<li>${word}: ${count}</li>`);
        return `<ul>${output}</ul>`;
    }
}
