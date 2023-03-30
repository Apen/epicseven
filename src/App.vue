<template>
  <div>
    <Navbar />
    <div class="container" style="margin-top: 10px">
      <div class="form-group">
        <input v-model="tower" type="text" class="form-control" :placeholder="$t('tower')" />
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <nav class="nav nav-tabs">
              <a class="nav-item nav-link active" href="#t1" data-toggle="tab">{{ $t('t1') }}</a>
              <a class="nav-item nav-link" href="#t2" data-toggle="tab">{{ $t('t2') }}</a>
              <a class="nav-item nav-link" href="#result" data-toggle="tab">{{ $t('report') }}</a>
            </nav>
          </div>
          <div class="toast-wrapper" style="position: absolute; top: -14px; right: 14px; z-index: 1000; height: 47px">
            <div id="resettoast" class="toast" data-delay="3000" aria-atomic="true">
              <div class="toast-body">
                {{ $t('resetToast') }}
              </div>
            </div>
          </div>
          <div class="toast-wrapper" style="position: absolute; top: -14px; right: 14px; z-index: 1000; height: 47px">
            <div id="copytoast" class="toast" data-delay="3000" aria-atomic="true">
              <div class="toast-body">
                {{ $t('copyToast') }}
              </div>
            </div>
          </div>
          <div class="toast-wrapper" style="position: absolute; top: -14px; right: 14px; z-index: 1000; height: 47px">
            <div id="slcopytoast" class="toast" data-delay="3000" aria-atomic="true">
              <div class="toast-body">
                {{ $t('copyToast') }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div id="t1" class="tab-pane active">
          <MyHero :hero="firstHero" />
          <hr />
          <Enemy
            :enemy="enemiesFirstHero.first"
            :label-hero="$t('enemiesFirstHero')"
            :label-artifact="$t('enemiesFirstArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesFirstHero.second"
            :label-hero="$t('enemiesSecondHero')"
            :label-artifact="$t('enemiesSecondArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesFirstHero.third"
            :label-hero="$t('enemiesThirdHero')"
            :label-artifact="$t('enemiesThirdArtifact')"
          />
        </div>
        <div id="t2" class="tab-pane">
          <MyHero :hero="secondHero" />
          <hr />
          <Enemy
            :enemy="enemiesSecondHero.first"
            :label-hero="$t('enemiesFirstHero')"
            :label-artifact="$t('enemiesFirstArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesSecondHero.second"
            :label-hero="$t('enemiesSecondHero')"
            :label-artifact="$t('enemiesSecondArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesSecondHero.third"
            :label-hero="$t('enemiesThirdHero')"
            :label-artifact="$t('enemiesThirdArtifact')"
          />
        </div>
        <div id="result" class="tab-pane">
          <div class="d-md-flex flex-md-row justify-content-md-end">
            <div class="p-2">
              <button class="btn btn-secondary" v-on:click="resetForm">
                {{ $t('reset') }}
              </button>
            </div>
            <div class="p-2">
              <button class="btn btn-secondary" v-on:click="copyToClipboard">
                {{ $t('copyText') }}
              </button>
            </div>
            <div class="p-2">
              <button class="btn btn-secondary" v-on:click="copyToClipboardSL">
                {{ $t('copyTextSL') }}
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <textarea id="report" v-model="report" class="form-control mt-3" style="height: 300px" />
                <textarea id="sl" style="opacity: 0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import $ from 'jquery';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ComponentMyHero, { Hero } from './components/MyHero.vue';
import ComponentEnemy, { Enemy } from './components/Enemy.vue';
import ComponentNavbar from './components/Navbar.vue';
import { en } from './lang/en';
import { fr } from './lang/fr';
import { cn } from './lang/cn';
import { tw } from './lang/tw';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages: {
    en,
    fr,
    cn,
    tw,
  },
});

require('./assets/css/dark-mode.css');
require('../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css');
require('../node_modules/bootstrap-select/dist/js/bootstrap-select.min');

export default Vue.extend({
  i18n,
  components: {
    MyHero: ComponentMyHero,
    Enemy: ComponentEnemy,
    Navbar: ComponentNavbar,
  },
  data() {
    return {
      firstHero: {} as Hero,
      secondHero: {} as Hero,
      enemiesFirstHero: {
        first: {} as Enemy,
        second: {} as Enemy,
        third: {} as Enemy,
      },
      enemiesSecondHero: {
        first: {} as Enemy,
        second: {} as Enemy,
        third: {} as Enemy,
      },
      tower: '',
      report: '',
    };
  },
  watch: {
    'firstHero.name': function (val): void {
      if (val && localStorage.getItem(val)) {
        Vue.set(this.firstHero, 'speed', parseInt(localStorage.getItem(val) as string, 10));
      } else {
        Vue.set(this.firstHero, 'speed', 0);
      }
    },
    'secondHero.name': function (val): void {
      if (val && localStorage.getItem(val)) {
        Vue.set(this.secondHero, 'speed', parseInt(localStorage.getItem(val) as string, 10));
      } else {
        Vue.set(this.secondHero, 'speed', 0);
      }
    },
    'firstHero.crBonus': function (): void {
      this.updateReport();
    },
    'firstHero.crPush': function (): void {
      this.updateReport();
    },
    'firstHero.crPushAlly': function (): void {
      this.updateReport();
    },
    'firstHero.speedDown': function (): void {
      this.updateReport();
    },
    'firstHero.speed': function (val): void {
      if (this.firstHero.name && val) {
        localStorage.setItem(this.firstHero.name, val);
      }
    },
    'secondHero.speed': function (val): void {
      if (this.secondHero.name && val) {
        localStorage.setItem(this.secondHero.name, val);
      }
    },
    'secondHero.crBonus': function (): void {
      this.updateReport();
    },
    'secondHero.crPush': function (): void {
      this.updateReport();
    },
    'secondHero.crPushAlly': function (): void {
      this.updateReport();
    },
    'secondHero.speedDown': function (): void {
      this.updateReport();
    },
    tower(): void {
      this.updateReport();
    },
    enemiesFirstHero: {
      deep: true,
      handler(): void {
        this.updateReport();
      },
    },
    enemiesSecondHero: {
      deep: true,
      handler(): void {
        this.updateReport();
      },
    },
  },
  updated() {
    $('.selectpicker').selectpicker('refresh');
    // $('[data-toggle="tooltip"]').tooltip('_fixTitle');
  },
  mounted() {
    /* eslint-disable  dot-notation */
    let langCode = navigator.language || window.navigator['userLanguage'];
    if (langCode === 'zh-TW' || langCode === 'zh-HK' || langCode === 'zh-MO') langCode = 'tw';
    if (langCode === 'zh-CN' || langCode === 'zh-SG') langCode = 'cn';
    if (localStorage.getItem('langCode')) {
      langCode = localStorage.getItem('langCode');
    }
    i18n.locale = langCode;
    document.title = this.$t('title') as string;
    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },
  methods: {
    updateReport(): void {
      this.report = '';
      if (this.tower) {
        this.report += `** ${this.tower} **\r\n`;
      }
      let contentT1 = '';
      contentT1 += this.updateLine(
        this.enemiesFirstHero.first,
        this.firstHero.speed,
        this.firstHero.crBonus,
        this.firstHero.crPush,
        this.firstHero.crPushAlly,
        this.firstHero.speedDown
      );
      contentT1 += this.updateLine(
        this.enemiesFirstHero.second,
        this.firstHero.speed,
        this.firstHero.crBonus,
        this.firstHero.crPush,
        this.firstHero.crPushAlly,
        this.firstHero.speedDown
      );
      contentT1 += this.updateLine(
        this.enemiesFirstHero.third,
        this.firstHero.speed,
        this.firstHero.crBonus,
        this.firstHero.crPush,
        this.firstHero.crPushAlly,
        this.firstHero.speedDown
      );
      if (contentT1 !== '') {
        this.report += `${this.$t('t1')}\r\n${contentT1}`;
      }
      let contentT2 = '';
      contentT2 += this.updateLine(
        this.enemiesSecondHero.first,
        this.secondHero.speed,
        this.secondHero.crBonus,
        this.secondHero.crPush,
        this.secondHero.crPushAlly,
        this.secondHero.speedDown
      );
      contentT2 += this.updateLine(
        this.enemiesSecondHero.second,
        this.secondHero.speed,
        this.secondHero.crBonus,
        this.secondHero.crPush,
        this.secondHero.crPushAlly,
        this.secondHero.speedDown
      );
      contentT2 += this.updateLine(
        this.enemiesSecondHero.third,
        this.secondHero.speed,
        this.secondHero.crBonus,
        this.secondHero.crPush,
        this.secondHero.crPushAlly,
        this.secondHero.speedDown
      );
      if (contentT2 !== '') {
        this.report += `${this.$t('t2')}\r\n${contentT2}`;
      }
    },
    updateLine(enemy: Enemy, baseSpeed: number, crBonus = 0, crPush = 0, crPushAlly = 0, speedDown = false): string {
      let content = '';
      if (enemy.name) {
        content += enemy.name;
        content += enemy.artifact ? ` - ${enemy.artifact}` : '';
        content += enemy.hp ? ` - ${this.formatHp(enemy.hp)} ${this.$t('hp')}` : '';
        if (enemy.cr && baseSpeed) {
          let { cr }: { cr: number } = enemy;
          cr = +cr;
          cr = crPushAlly > 0 ? cr + crPushAlly : cr;
          cr = crPush > 0 ? cr - crPush : cr;
          cr = crBonus > 0 ? (cr * 100) / (crBonus + 100) : cr;
          let crMin = (cr - 5) / 100;
          let crMax = (cr + 5) / 100;
          if (enemy.outspeed) {
            if (speedDown) {
              crMin *= 0.7;
              crMax *= 0.7;
            }
            crMin += 1;
            crMax += 1;
          }

          const speedmin = Math.round(crMin * baseSpeed);
          const speedmax = Math.round(crMax * baseSpeed);
          const speedRange = `${speedmin}-${speedmax}`;
          content += ` - ${speedRange} ${this.$t('speed')}`;
        }
        content += enemy.immunity ? ` - ${this.$t('setImmunity')}` : '';
        content += enemy.protection ? ` - ${this.$t('setProtection')}` : '';
        content += enemy.counter ? ` - ${this.$t('setCounter')}` : '';
        content += enemy.lifesteal ? ` - ${this.$t('setLifesteal')}` : '';
        content += enemy.injury ? ` - ${this.$t('setInjury')}` : '';
        content += enemy.infos ? ` - ${enemy.infos}` : '';
        content += '\r\n';
      }
      return content;
    },
    formatHp(num: number): number | string {
      let numFormated = num > 999 ? num / 1000 + (this.$t('formatHpK') as string) : num;
      if ($('#locale-changer :selected').val() === 'cn' || $('#locale-changer :selected').val() === 'tw') {
        numFormated = num > 9999 ? num / 10000 + (this.$t('formatHpK') as string) : num;
      }
      return numFormated;
    },
    copyToClipboard(): void {
      if ($('#report')) {
        $('#report').select();
        document.execCommand('copy');
        $('.toast').toast('hide');
        $('#copytoast').toast('show');
      }
    },
    copyToClipboardSL(): void {
      if ($('#report')) {
        const copyText = document.querySelector('#report') as HTMLInputElement;
        const ML = copyText.value;
        const SL = ML.replace(/(\r\n|\n|\r)/gm, ' ');
        const slcopy = document.getElementById('sl') as HTMLInputElement;
        if (slcopy !== null) {
          slcopy.value = SL;
          slcopy.select();
          document.execCommand('copy');
          $('.toast').toast('hide');
          $('#slcopytoast').toast('show');
        }
      }
    },
    resetForm(): void {
      document.location.reload();
      $('.toast').toast('hide');
      $('#resettoast').toast('show');
    },
  },
});
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
