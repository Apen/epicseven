<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">{{ $t('title') }}</a>
      <div class="col-md-6">
        <div class="custom-control float-right">
          <a href="https://www.buymeacoffee.com/apencoffee" target="_blank">Buy me a coffee</a>
        </div>
        <div class="custom-control custom-switch float-right">
          <input id="darkSwitch" v-model="darkMode" type="checkbox" class="form-control custom-control-input" />
          <label class="custom-control-label" for="darkSwitch">{{ $t('darkMode') }}</label>
        </div>
        <div class="custom-control float-right mr-3">
          <select id="locale-changer" v-model="$i18n.locale" class="form-control" @change="changeLang()">
            <option v-for="lang in langs" :value="lang.code" :key="lang.code">
              {{ lang.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import MainStore from '../stores/MainStore';

export default {
  data() {
    return {
      darkMode: MainStore.data.darkMode,
      langs: MainStore.data.langs,
    };
  },
  watch: {
    darkMode(val) {
      this.toggleDarkMode(val);
    },
  },
  mounted() {
    if (localStorage.getItem('darkMode')) {
      this.toggleDarkMode(localStorage.getItem('darkMode'));
    }
  },
  methods: {
    toggleDarkMode(val) {
      if (val === true || val === 'true') {
        document.body.classList.add('dark');
        this.darkMode = true;
      } else {
        document.body.classList.remove('dark');
        this.darkMode = false;
      }
      localStorage.setItem('darkMode', val);
    },
    changeLang() {
      localStorage.setItem('langCode', this.$i18n.locale);
      document.title = this.$t('title');
    },
  },
};
</script>
