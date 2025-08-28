import { ICheck } from "./ICheck.js";

export class RepeatPhrases extends ICheck {
    id = "repeatphrase"
    message = 'Text free of repeat phrases';
    style = 'warning';

    counts = {}
    minPhraseLength = 3;
    minWordLength = 3;

    isInAnyParagraph(paragraphs) {
        this.counts = {}
        for (const paragraph of paragraphs) {
            let words = paragraph.toLowerCase().replace(/[^A-Za-z0-9 ]/g, '').split(' ')

            for (let i = 0; i <= words.length-this.minPhraseLength; i++) {
                let phrase = '';
                for (let j = 0; j < this.minWordLength; j++)
                {
                    phrase += `${words[i+j]} `;
                }

                this.counts[phrase] = this.counts[phrase] || 0;
                this.counts[phrase] += 1;
            }
        }

        const filtered = Object.entries(this.counts).filter(([phrase, count]) => count >= this.minPhraseLength)
        return filtered.length > 0;
    }

    render(paragraph) {
        return `<span class="anchor-offset" id="${this.id}"></span><span class="highlight-${this.style}">${paragraph}</span>`;
    }

    renderAdditional() {
        const filtered = Object.entries(this.counts).filter(([word, count]) => count >= this.minPhraseLength)
        const output = filtered.map(([word, count]) => `<li>${word}: ${count}</li>`);
        return `<ul>${output.join('')}</ul>`;
    }
}
