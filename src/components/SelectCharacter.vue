<template>
  <select :value="value" class="selectpicker" :title="title" data-live-search="true" data-width="100%" @change="select">
    <option v-for="item in characters" :key="item.name" :data-tokens="getTokens(item)">
      {{ item.name }}
    </option>
  </select>
</template>

<script>
import $ from 'jquery';
import { en } from '../assets/js/en.characters';
import { fr } from '../assets/js/fr.characters';
import { cn } from '../assets/js/cn.characters';
import { tw } from '../assets/js/tw.characters';
import { nicknames } from '../assets/js/nicknames';

export default {
  props: ['title', 'value'],
  data() {
    return {
      characters: this.getItems(),
      nicknames,
    };
  },
  watch: {
    title() {
      this.characters = this.getItems();
    },
  },
  updated() {
    $(this.$el).selectpicker({ title: this.title }).selectpicker('render');
  },
  methods: {
    select($event) {
      this.$emit('input', $event.target.value);
    },
    getItems() {
      let characters = null;
      switch (this.$i18n.locale) {
        case 'en':
          characters = en;
          break;
        case 'fr':
          characters = fr;
          break;
        case 'cn':
          characters = cn;
          break;
        case 'tw':
          characters = tw;
          break;
        default:
          characters = en;
          break;
      }
      return characters;
    },
    getTokens(item) {
      if (item._id && nicknames[item._id]) {
        return nicknames[item._id];
      }
      return '';
    },
  },
};
</script>
