<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { checklist } from "@/data/checklist.js"
import { themes } from "@/data/themes.js"

const input = ref('');
const randomTheme = themes[Math.floor(Math.random() * themes.length)];
const state = reactive({ messages: [], theme: randomTheme });
const console = computed(() => console);

const renderedInput = computed(() => {
  const extraBreakRegex = /\n{3,}/gim;

  return input.value
      .replace(extraBreakRegex, '<span id="linebreaks" class="highlight-error">BREAK</span>')
      .split(/\n\s*\n/).filter(Boolean)
      .map((paragraph) => renderParagraph(paragraph)).join('');
});

const paragraphs = computed(() => {
  return input.value.split(/\n\s*\n/).filter(Boolean);
});

watch(input, async (oldInput, newInput) => {
  state.messages = checklist.map((check) => check.getMessage(input, paragraphs.value));
})

function clear(event) {
  input.value = '';
}

async function paste(event) {
  try {
    const text = await navigator.clipboard.readText()
    input.value = text;
  } catch (error) {
  }
}

function renderParagraph(paragraph) {
  for (let check of checklist) {
    if (check.isInParagraph(paragraph)) {
      paragraph = check.render(paragraph);
    }
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
            <a href="#" @click="clear">Clear</a><span>&nbsp;|&nbsp;</span><a href="#" @click="paste">Paste</a>
          </nav>
        </div>

        <div class="col-span-4">
          <aside>
            <div>
              <p v-if="state.messages.length === 0" class="info">
                Run checks for common mistakes
              </p>
              <p v-for="msg in state.messages" :class="msg.style">
                <a :href="msg.href">{{ msg.text }}</a>
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
          <article v-html="renderedInput"></article>
        </div>

        <footer>
          Made by <a href="https://www.daniel-jordan.com">Dan Jordan</a>
        </footer>
      </div>
    </main>
  </div>
</template>
