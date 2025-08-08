import { ICheck } from "@/checks/ICheck.js";

export class RepeatPhrases extends ICheck {
    id = "repeatphrase"
    message = 'Text free of repeat phrases';
    style = 'warning';

    counts = {}
    minCount = 3;
    minLength = 3;

    isInAnyParagraph(paragraphs) {
        this.counts = {}
        for (const paragraph of paragraphs) {
            let words = paragraph.toLowerCase().replace(/[^A-Za-z0-9 ]/g, '').split(' ')

            for (let i = 0; i < words.length-this.minLength; i++) {
                let phrase = '';
                for (let j = 0; j < this.minLength; j++)
                {
                    phrase += `${words[i+j]} `;
                }

                this.counts[phrase] = this.counts[phrase] || 0;
                this.counts[phrase] += 1;
            }
        }
        const filtered = Object.entries(this.counts).filter(([phrase, count]) => count >= this.minCount)
        return filtered.length > 0;
    }

    render(paragraph) {
        return `<span id="${this.id}" class="highlight-${this.style}">${paragraph}</span>`;
    }

    renderAdditional() {
        const filtered = Object.entries(this.counts).filter(([word, count]) => count >= this.minCount)
        const output = filtered.map(([word, count]) => `<li>${word}: ${count}</li>`);
        return `<ul>${output.join('')}</ul>`;
    }
}
