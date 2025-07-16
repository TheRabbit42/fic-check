import { ICheck } from "@/checks/ICheck.js";

export class WordCountMultiple extends ICheck {
    message = 'Word count is a multiple of 500';
    style = 'error';

    wordCount(input) {
        let s = input.value
        s = s.replace(/(^\s*)|(\s*$)/gi, ""); // exclude start and end white-space
        s = s.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, ' ');
        s = s.replace(/(\u000d)/g, ' '); // Carriage returns
        s = s.replace(/\n /gi, '\n'); // exclude newline with a start spacing
        s = s.replace(/<\/?\w*\/?>/gi, ' ');
        s = s.replace(/(?<=\w)—(?=\w)/gi, ' '); // split em-dashes
        s = s.replace(/(?<=\w)–(?=\w)/gi, ' '); // split en-dashes

        // Some punctuation doesn't split words
        s = s.replace(/['\-_]/gi, '');

        // Some punctuation splits words
        s = s.replace(/[/!"#$%&()*+,.:;=?@^{|}–—]/gi, ' ');

        s = s.replace(/\n/gi, ' '); // split on new lines
        s = s.replace(/[ ]{2,}/gi, " "); // 2 or more space to 1
        return s.split(' ').filter(function(str){ return str != ''; }).length
    }

    isInAnyParagraph(paragraphs) {
        return false;
    }

    getMessage(input, paragraphs){
        return(
            {
                text: this.message,
                style: this.wordCount(input) % 500 > 0 ? this.style : 'success',
                href: `#${this.id}`
            }
        )
    }
}
