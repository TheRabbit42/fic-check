<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { checklist } from "@/data/checklist.js"
import { ExtraLineBreaks } from "@/checks/ExtraLineBreaks.js"
import { themes } from "@/data/themes.js"
import { countWords, wordCountDisplayText } from "@/helpers/stringHelpers.js";

const input = ref('');
const randomTheme = themes[Math.floor(Math.random() * themes.length)];
const state = reactive({
  messages: [],
  lastCheckId: null,
  lastCheckIndex: 0,
  theme: randomTheme
});
const breakChecker = new ExtraLineBreaks();

const renderedInput = computed(() => {
  const extraBreakRegex = /\n{3,}/gim;

  let breakCounter = 0;
  checklist.forEach((check) => check.reset());
  breakChecker.reset();

  return input.value
      .replace(extraBreakRegex, (match) => breakChecker.genericHighlight(match))
      .split(/\n\s*\n/)
      .filter(Boolean)
      .map((paragraph) => renderParagraph(paragraph))
      .join('');
});

const wordCountDisplay = computed(() => {
  const count = countWords(input.value);
  return wordCountDisplayText(count);
});

const paragraphs = computed(() => {
  return input.value.split(/\n\s*\n/).filter(Boolean);
});

watch(input, async (oldInput, newInput) => {
  state.messages = checklist.map((check) => check.getMessages(input, paragraphs.value)).flat();
})

function clear(event) {
  input.value = '';
}

function clickedCheck(check) {
  if (check.id === state.lastCheckId) {
    state.lastCheckIndex++;
  } else {
    state.lastCheckId = check.id;
    state.lastCheckIndex = 0;
  }

  // Handle rollover
  let id = `${state.lastCheckId}-${state.lastCheckIndex}`;
  let element = document.getElementById(id)
  if (element == null) {
    state.lastCheckIndex = 0;
    id = `${state.lastCheckId}-${state.lastCheckIndex}`;
    element = document.getElementById(id)
  }

  // Focus
  if (element != null) {
    element.focus();
  }
}

async function paste(event) {
  try {
    const text = await navigator.clipboard.readText()
    input.value = text;
  } catch (error) {
  }
}

function renderParagraph(paragraph) {
  for (let checkSet of checklist) {
    paragraph = checkSet.renderParagraph(paragraph);
  }
  return `<p>${paragraph}</p>`;
}
</script>

<template>
  <div class="themed" :class="state.theme">
    <header>
      <div class="container">
        <div class="col-span-8">
          <textarea v-model="input" autofocus placeholder="Insert text"></textarea>
          <nav>
            <a href="#" @click="clear">Clear</a>
            <a href="#" @click="paste">Paste</a>
          </nav>
        </div>

        <div class="col-span-4">
          <aside>
            <div class="word-count-display">
              <div>
                <div>
                  {{ wordCountDisplay }}
                </div>
              </div>
            </div>
            <div v-if="renderedInput === ''" >
              <p class="placeholder-text">
                check for<br/>common<br/>mistakes
              </p>
            </div>
            <div v-if="renderedInput !== ''" >
              <p v-for="msg in state.messages" :class="msg.style">
                <a @click="clickedCheck(msg)">{{ msg.text }}</a>
                <p v-html="msg.renderAdditional"></p>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </header>

    <main>
      <div>
        <div class="container">
          <article v-if="renderedInput === ''" class="col-span-8">
            <p class="placeholder-text">
              see how the<br/>
              text will look<br/>
              when rendered
            </p>
          </article>
          <article v-if="renderedInput !== ''" class="col-span-8" v-html="renderedInput"></article>
          <div class="col-span-4"></div>
        </div>
      </div>
      <footer>
        Made by <a href="https://www.daniel-jordan.com">Dan Jordan</a>
      </footer>
    </main>
  </div>
</template>
