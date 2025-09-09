export const wordDelimiters = /[/!"#$%&()*+,.:;=?@^{|}–—]/gi

export function countWords(text) {

    return splitWords(text).length;
}

export function splitWords(text) {
    text = text.toLowerCase();
    text = text.replace(/(^\s*)|(\s*$)/gi, ''); // exclude start and end white-space
    text = text.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, ' ');
    text = text.replace(/(\u000d)/g, ' '); // Carriage returns
    text = text.replace(/\n /gi, '\n'); // exclude newline with a start spacing
    text = stripHtml(text);
    text = text.replace(/\n/gi, ' '); // split on new lines
    text = text.replace(wordDelimiters, ' ');
    text = text.replace(/[ ]{2,}/gi, ' '); // 2 or more space to 1
    return text.split(' ').filter(function(str){ return str !== ''; })
}

export function stripHtml(text) {
    return text
        .replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
