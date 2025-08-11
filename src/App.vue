<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { checklist } from "@/data/checklist.js"

const input = ref('');
const state = reactive({ messages: [] });
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
  <div class="input">
    <textarea v-model="input" placeholder="Insert text"></textarea>
    <div v-html="renderedInput" class="rendered"></div>
  </div>

  <div class="output">
    <div class="actions">
      <a href="#" @click="clear">Clear</a><span>&nbsp;|&nbsp;</span><a href="#" @click="paste">Paste</a>
    </div>

    <p v-for="msg in state.messages" :class="msg.style">
      <a :href="msg.href">{{ msg.text }}</a>
      <p v-html="msg.renderAdditional"></p>
    </p>
  </div>
</template>
