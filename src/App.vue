<script setup>
import { reactive, ref, computed, watch } from 'vue'

const input = ref('');
const state = reactive({ messages: [] });
let showHtml = ref(true);

const console = computed(() => console);

const wordCount = computed(() => {
  let s = input.value
  s = s.replace(/(^\s*)|(\s*$)/gi, ""); // exclude start and end white-space
  s = s.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, ' ');
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
});

const renderedInput = computed(() => {
  const extraBreakRegex = /\n{3,}/gim;

  return input.value
      .replace(extraBreakRegex, '<span id="linebreaks" class="highlight-red">BREAK</span>')
      .split(/\n\s*\n/).filter(Boolean)
      .map((para) => renderParagraph(para)).join('');
});

const paragraphs = computed(() => {
  return input.value.split(/\n\s*\n/).filter(Boolean);
});

const paragraphCount = computed(() => {
  return stripHtml(input.value).split(/\n\s*\n/).filter(Boolean).length;
});

const parasWithUnclosedQuotes = computed(() => {
  return paragraphs.value.filter((para) => (para.match(/"/g) || []).length % 2 > 0);
});

const parasWithInvalidHtml = computed(() => {
  return paragraphs.value.filter((para) =>
    (para.match(/<em>/gi) || []).length != (para.match(/<\/em>/gi) || []).length
  );
});

const parasWithSmartPunctuation = computed(() => {
  return paragraphs.value.filter((para) => isParagraphWithSmartPunctuation(para));
});

const parasWithRepeatWhitespace = computed(() => {
  return paragraphs.value.filter((para) => isParagraphWithRepeatWhitespace(para));
});

const parasWithRepeatWords = computed(() => {
  return paragraphs.value.filter((para) => isParagraphWithRepeatWord(para));
});

const parasWithUnsmoothAttribution = computed(() => {
  return paragraphs.value.filter((para) => isParagraphWithUnsmoothAttribution(para));
});

const extraLineBreaks = computed(() => {
  return (input.value.match(/\n{3,}/gim) || [])
});

const inputWithoutHtml = computed(() => {
  let doc = new DOMParser().parseFromString(input.value, 'text/html');
  return doc.body.textContent || '';
});

watch(input, async (oldInput, newInput) => {
  state.messages = [
    {
      text: 'Word count is a multiple of 500.',
      error: wordCount.value % 500 > 0,
    },
    {
      text: 'All paragraphs have closed quotes.',
      error: parasWithUnclosedQuotes.value.length > 0,
      href: '#quote'
    },
    {
      text: 'All paragraphs have valid HTML.',
      error: parasWithInvalidHtml.value.length > 0,
      href: '#html'
    },
    {
      text: 'All paragraphs free from smart quotes.',
      error: parasWithSmartPunctuation.value.length > 0,
      href: '#smartquotes'
    },
    {
      text: 'All paragraphs free from excess whitespace.',
      error: parasWithRepeatWhitespace.value.length > 0,
      href: '#whitespace'
    },
    {
      text: 'All paragraphs free from double words.',
      warning: parasWithRepeatWords.value.length > 0,
      href: '#repeat'
    },
    {
      text: 'All paragraphs free from extra line breaks.',
      error: extraLineBreaks.value.length > 0,
      href: '#linebreaks'
    },
    {
      text: 'All quotes have smooth attributions.',
      error: parasWithUnsmoothAttribution.value.length > 0,
      href: '#attributions'
    }
  ]
})


function renderParagraph(paragraph) {
  if (isParaWithUnclosedQuotes(paragraph)) {
    const regex = /"/g;
    paragraph = paragraph.replace(regex, '<span id="quote" class="highlight-red">$&</span>');
  }

  if (isParaWithInvalidHtml(paragraph)) {
    if (isParaWithUnopenedTag(paragraph)) {
      const regex = /<\/em>/gi;
      paragraph = paragraph.replace(regex, '<span id="html" class="highlight-red">[em]</span>$&');
    }
    else if (isParaWithUnclosedTag(paragraph)) {
      const regex = /<em>/gi;
      paragraph = paragraph.replace(regex, '[em]$&<span id="html" class="highlight-red"/>');
    }
  }

  if (isParagraphWithSmartPunctuation(paragraph)) {
    const regex = /[‘’’“”]/gi;
    paragraph = paragraph.replace(regex, '<span id="smartquotes" class="highlight-red">$&</span>');
  }

  if (isParagraphWithRepeatWhitespace(paragraph)) {
    const regex = /\s{2,}/gi;
    paragraph = paragraph.replace(regex, '<span id="whitespace" class="highlight-red">$&</span>');
  }

  if (isParagraphWithRepeatWord(paragraph)) {
    paragraph = `<span id="repeat" class="highlight-yellow">${paragraph}</span>`;
  }

  if (isParagraphWithUnsmoothAttribution(paragraph)) {
    const regex = /[?!]" [A-Z][ A-z]+ (said|asked)/g; // "h!" S
    paragraph = paragraph.replace(regex, '<span id="attributions" class="highlight-red">$&</span>');
  }

  paragraph = `<p>${paragraph}</p>`;
  return paragraph;
}

function highlightedRegex(string, regex) {
  string.replace(regex, '<span className="highlight">$&</span>');
  return string;
}

function isParaWithUnclosedQuotes(paragraph) {
  return (paragraph.match(/"/g) || []).length % 2 > 0
}

function isParaWithInvalidHtml(paragraph) {
  return (paragraph.match(/<em>/gi) || []).length != (paragraph.match(/<\/em>/gi) || []).length
}

function isParagraphWithSmartPunctuation(paragraph) {
  const punctuationMarks = /[‘’’“”]/gi;
  return (paragraph.match(punctuationMarks) || []).length > 0;
}

function isParaWithUnopenedTag(paragraph) {
  return (paragraph.match(/<em>/gi) || []).length < (paragraph.match(/<\/em>/gi) || []).length
}

function isParaWithUnclosedTag(paragraph) {
  return (paragraph.match(/<em>/gi) || []).length > (paragraph.match(/<\/em>/gi) || []).length
}

function isParagraphWithRepeatWhitespace(paragraph) {
  const initialLength = paragraph.length;
  paragraph = paragraph.replace(/\s{2,}/gi, ' ');
  const finalLength = paragraph.length;
  return initialLength != finalLength;
}

function isParagraphWithRepeatWord(paragraph) {
  let lastWord = null;
  for (const word of paragraph.split(' ')) {
    if (word === lastWord) {
      return true;
    }
    lastWord = word;
  }
  return false;
}

function isParagraphWithUnsmoothAttribution(paragraph) {
  const sequence = /[?!]" [A-Z][ A-z]+ (said|asked)/g;
  return (paragraph.match(sequence) || []).length > 0;
}

function classForMessage(message) {
  if (message.error) {
    return 'error';
  } else if (message.warning) {
    return 'warning';
  }
  return 'success';
}

function stripHtml(text) {
  let doc = new DOMParser().parseFromString(text, 'text/html');
  return doc.body.textContent || '';
}
</script>

<template>
  <div class="output">
    <p>{{ wordCount }} words</p>
    <p>{{ paragraphCount }} paragraphs</p>
    <p v-for="msg in state.messages" :class="classForMessage(msg)">
      <a :href="msg.href">{{ msg.text }}</a>
    </p>
  </div>

  <div>
    <textarea v-model="input" placeholder="Insert text"></textarea>
    <div v-html="renderedInput" class="rendered"></div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
