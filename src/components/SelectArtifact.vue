<template>
  <select
    :value="value"
    class="selectpicker"
    :title="title"
    data-live-search="true"
    data-width="100%"
    @change="select"
  >
    <option
      v-for="item in artifacts"
      :key="item._id"
      :data-tokens="getTokens(item)"
    >
      {{ item.name }}
    </option>
  </select>
</template>

<script>
import $ from 'jquery';
import { en } from '../assets/js/en.artifacts';
import { fr } from '../assets/js/fr.artifacts';
import { cn } from '../assets/js/cn.artifacts';
import { tw } from '../assets/js/tw.artifacts';
import { nicknames } from '../assets/js/nicknames';

export default {
  props: ['title', 'value'],
  data() {
    return {
      artifacts: this.getItems(),
      nicknames,
    };
  },
  watch: {
    title() {
      this.artifacts = this.getItems();
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
      let artifacts = null;
      switch (this.$i18n.locale) {
        case 'en':
          artifacts = en;
          break;
        case 'fr':
          artifacts = fr;
          break;
        case 'cn':
          artifacts = cn;
          break;
        case 'tw':
          artifacts = tw;
          break;
        default:
          artifacts = en;
          break;
      }
      return artifacts;
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
