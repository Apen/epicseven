<template>
  <select
    :value="value"
    class="selectpicker"
    :title="title"
    data-live-search="true"
    data-width="100%"
    @change="select($event)"
  >
    <option v-for="item in artifacts" :key="item._id" :data-tokens="getTokens(item)">
      {{ item.name }}
    </option>
  </select>
</template>

<script lang="ts">
import Vue from 'vue';
import $ from 'jquery';
import 'bootstrap-select';
import { en } from '../assets/js/en.artifacts';
import { fr } from '../assets/js/fr.artifacts';
import { cn } from '../assets/js/cn.artifacts';
import { tw } from '../assets/js/tw.artifacts';
import { nicknames } from '../assets/js/nicknames';

export default Vue.extend({
  props: ['title', 'value'],
  data() {
    return {
      artifacts: en,
      nicknames,
    };
  },
  created() {
    this.artifacts = this.getItems();
  },
  watch: {
    title(): void {
      this.artifacts = this.getItems();
    },
  },
  updated() {
    $(this.$el).selectpicker({ title: this.title }).selectpicker('render');
  },
  methods: {
    select($event: Event): void {
      this.$emit('input', ($event.target as HTMLInputElement).value);
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    getItems(): Array<any> {
      let artifacts = null;
      switch (this.$i18n.locale) {
        case 'en':
          artifacts = en;
          break;
        case 'fr':
          artifacts = this.uniqueMerge([en, fr]);
          break;
        case 'cn':
          artifacts = this.uniqueMerge([en, cn]);
          break;
        case 'tw':
          artifacts = this.uniqueMerge([en, tw]);
          break;
        default:
          artifacts = en;
          break;
      }
      return artifacts;
    },
    uniqueMerge(arrays) {
      const results = {};
      arrays.forEach((arr) => {
        arr.forEach((item) => {
          results[item._id] = item;
        });
      });
      return Object.values(results);
    },
    getTokens(item: { _id: string }): string {
      if (item._id && nicknames[item._id]) {
        return nicknames[item._id];
      }
      return '';
    },
  },
});
</script>
