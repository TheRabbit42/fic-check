import { ICheck } from "./ICheck.js";
import { splitWords } from "../helpers/stringHelpers.js";

export class RepeatPhrases extends ICheck {
    message = 'No repeat phrases';
    style = 'warning';

    counts = {}
    minPhraseLength = 3;
    minWordLength = 3;

    isInParagraph(paragraph) {
        return true;
    }

    isInAnyParagraph(paragraphs) {
        this.counts = {}
        for (const paragraph of paragraphs) {
            let words = splitWords(paragraph);
            for (let i = 0; i <= words.length-this.minPhraseLength; i++) {
                let phrase = '';
                for (let j = 0; j < this.minWordLength; j++)
                {
                    phrase += `${words[i+j]} `;
                }

                this.counts[phrase.trim()] = this.counts[phrase.trim()] || 0;
                this.counts[phrase.trim()] += 1;
            }
        }

        const filtered = Object.entries(this.counts).filter(([phrase, count]) => count >= this.minPhraseLength);
        return filtered.length > 0;
    }

    renderParagraph(paragraph) {
        const filtered = Object.entries(this.counts)
            .filter(([phrase, count]) => count >= this.minPhraseLength)
            .map(([phrase, count]) => phrase);
        if (filtered.length === 0) return paragraph;

        const joinedPhrases = filtered.join('|');
        const regex = new RegExp(`\\b(${joinedPhrases})\\b`, 'gi');
        return paragraph.replace(regex, (match) => this.genericHighlight(match));
    }

    renderAdditional() {
        const filtered = Object.entries(this.counts).filter(([word, count]) => count >= this.minPhraseLength)
        const output = filtered.map(([word, count]) => `<li>${word}: ${count}</li>`);
        return `<ul>${output.join('')}</ul>`;
    }
}
