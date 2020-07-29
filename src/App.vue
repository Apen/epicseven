<template>
  <div>
    <div class="container" style="margin-top:10px;">
      <div class="row">
        <div class="col-md-6">
          <h1>{{ $t('title') }}</h1>
        </div>
        <div class="col-md-6">
          <div class="custom-control custom-switch float-right">
            <input type="checkbox" class="custom-control-input" id="darkSwitch" v-model="darkMode" />
            <label class="custom-control-label" for="darkSwitch">{{ $t('darkMode') }}</label>
          </div>
          <div class="locale-changer float-right mr-3">
            <select
              id="locale-changer"
              v-model="$i18n.locale"
              style="height: 26px;"
              @change="changeLang()"
            >
              <option v-for="(lang) in langs" :value="lang.code" :key="lang.code">{{ lang.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      <div class="form-group">
        <input type="text" v-model="tower" class="form-control" :placeholder="$t('tower')" />
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
          <div
            class="toast-wrapper"
            style="position:absolute; top:-14px; right: 14px;z-index:1000;height:47px;"
          >
            <div class="toast" id="resettoast" data-delay="3000" aria-atomic="true">
              <div class="toast-body">{{ $t('resetToast') }}</div>
            </div>
          </div>
          <div
            class="toast-wrapper"
            style="position:absolute; top:-14px; right: 14px;z-index:1000;height:47px;"
          >
            <div class="toast" id="copytoast" data-delay="3000" aria-atomic="true">
              <div class="toast-body">{{ $t('copyToast') }}</div>
            </div>
          </div>
          <div
            class="toast-wrapper"
            style="position:absolute;  top:-14px; right: 14px;z-index:1000;height:47px;"
          >
            <div class="toast" id="slcopytoast" data-delay="3000" aria-atomic="true">
              <div class="toast-body">{{ $t('copyToast') }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane active" id="t1">
          <MyHero :hero="firstHero" />
          <hr />
          <Enemy
            :enemy="enemiesFirstHero.first"
            :labelHero="$t('enemiesFirstHero')"
            :label-artifact="$t('enemiesFirstArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesFirstHero.second"
            :labelHero="$t('enemiesSecondHero')"
            :label-artifact="$t('enemiesSecondArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesFirstHero.third"
            :labelHero="$t('enemiesThirdHero')"
            :label-artifact="$t('enemiesThirdArtifact')"
          />
        </div>
        <div class="tab-pane" id="t2">
          <MyHero :hero="secondHero" />
          <hr />
          <Enemy
            :enemy="enemiesSecondHero.first"
            :labelHero="$t('enemiesFirstHero')"
            :label-artifact="$t('enemiesFirstArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesSecondHero.second"
            :labelHero="$t('enemiesSecondHero')"
            :label-artifact="$t('enemiesSecondArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesSecondHero.third"
            :labelHero="$t('enemiesThirdHero')"
            :label-artifact="$t('enemiesThirdArtifact')"
          />
        </div>
        <div class="tab-pane" id="result">
          <div class="d-md-flex flex-md-row justify-content-md-end">
            <div class="p-2">
              <button class="btn btn-secondary" v-on:click="resetForm">{{ $t('reset') }}</button>
            </div>
            <div class="p-2">
              <button class="btn btn-secondary" v-on:click="copyToClipboard">{{ $t('copyText') }}</button>
            </div>
            <div class="p-2">
              <button
                class="btn btn-secondary"
                v-on:click="copyToClipboardSL"
              >{{ $t('copyTextSL') }}</button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <textarea
                  id="report"
                  v-model="report"
                  class="form-control mt-3"
                  style="height:300px"
                ></textarea>
                <textarea id="sl" style="opacity:0"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
import VueI18n from "vue-i18n";
import ComponentMyHero from "./components/MyHero";
import ComponentEnemy from "./components/Enemy";
import { en } from "./lang/en.js";
import { fr } from "./lang/fr.js";
import { cn } from "./lang/cn.js";
import { tw } from "./lang/tw.js";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  silentTranslationWarn: true,
  messages: {
    en: en,
    fr: fr,
    cn: cn,
    tw: tw
  }
});

require("@/assets/css/dark-mode.css");
require("../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css");
require("../node_modules/bootstrap-select/dist/js/bootstrap-select.min");

export default {
  i18n,
  components: {
    MyHero: ComponentMyHero,
    Enemy: ComponentEnemy
  },
  data: function() {
    return {
      langs: [
        { code: "en", name: "English" },
        { code: "fr", name: "Français" },
        { code: "cn", name: "简体中文" },
        { code: "tw", name: "繁體中文" }
      ],
      firstHero: {
        name: "",
        speed: "",
        crBonus: "",
        crPush: "",
        crPushAlly: "",
        speedDown: "",
      },
      secondHero: {
        name: "",
        speed: "",
        crBonus: "",
        crPush: "",
        crPushAlly: "",
        speedDown: "",
      },
      enemiesFirstHero: {
        first: {},
        second: {},
        third: {}
      },
      enemiesSecondHero: {
        first: {},
        second: {},
        third: {}
      },
      tower: "",
      report: "",
      darkMode: false
    };
  },
  watch: {
    "firstHero.name": function(val) {
      if (val && localStorage.getItem(val)) {
        this.firstHero.speed = localStorage.getItem(val);
      } else {
        this.firstHero.speed = "";
      }
    },
    "secondHero.name": function(val) {
      if (val && localStorage.getItem(val)) {
        this.secondHero.speed = localStorage.getItem(val);
      } else {
        this.secondHero.speed = "";
      }
    },
    "firstHero.crBonus": function() {
      this.updateReport();
    },
    "firstHero.crPush": function() {
      this.updateReport();
    },
    "firstHero.crPushAlly": function() {
      this.updateReport();
    },
    "firstHero.speedDown": function() {
      this.updateReport();
    },
    "firstHero.speed": function(val) {
      if (this.firstHero.name && val) {
        localStorage.setItem(this.firstHero.name, val);
      }
    },
    "secondHero.speed": function(val) {
      if (this.secondHero.name && val) {
        localStorage.setItem(this.secondHero.name, val);
      }
    },
    "secondHero.crBonus": function() {
      this.updateReport();
    },
    "secondHero.crPush": function() {
      this.updateReport();
    },
    "secondHero.crPushAlly": function() {
      this.updateReport();
    },
    "secondHero.speedDown": function() {
      this.updateReport();
    },
    tower: function() {
      this.updateReport();
    },
    enemiesFirstHero: {
      deep: true,
      handler() {
        this.updateReport();
      }
    },
    enemiesSecondHero: {
      deep: true,
      handler() {
        this.updateReport();
      }
    },
    darkMode: function(val) {
      this.toggleDarkMode(val);
    }
  },
  methods: {
    updateReport: function() {
      this.report = "";
      if (this.tower) {
        this.report += "** " + this.tower + " **\r\n";
      }
      let contentT1 = "";
      contentT1 += this.updateLine(
        this.enemiesFirstHero.first,
        this.firstHero.speed,
        this.firstHero.crBonus,
        this.firstHero.crPush,
        this.firstHero.crPushAlly,
        this.firstHero.speedDown,
      );
      contentT1 += this.updateLine(
        this.enemiesFirstHero.second,
        this.firstHero.speed,
        this.firstHero.crBonus,
        this.firstHero.crPush,
        this.firstHero.crPushAlly,
        this.firstHero.speedDown,
      );
      contentT1 += this.updateLine(
        this.enemiesFirstHero.third,
        this.firstHero.speed,
        this.firstHero.crBonus,
        this.firstHero.crPush,
        this.firstHero.crPushAlly,
        this.firstHero.speedDown,
      );
      if (contentT1 !== "") {
        this.report += this.$t("t1") + "\r\n" + contentT1;
      }
      let contentT2 = "";
      contentT2 += this.updateLine(
        this.enemiesSecondHero.first,
        this.secondHero.speed,
        this.secondHero.crBonus,
        this.secondHero.crPush,
        this.secondHero.crPushAlly,
        this.secondHero.speedDown,
      );
      contentT2 += this.updateLine(
        this.enemiesSecondHero.second,
        this.secondHero.speed,
        this.secondHero.crBonus,
        this.secondHero.crPush,
        this.secondHero.crPushAlly,
        this.secondHero.speedDown,
      );
      contentT2 += this.updateLine(
        this.enemiesSecondHero.third,
        this.secondHero.speed,
        this.secondHero.crBonus,
        this.secondHero.crPush,
        this.secondHero.crPushAlly,
        this.secondHero.speedDown,
      );
      if (contentT2 !== "") {
        this.report += this.$t("t2") + "\r\n" + contentT2;
      }
    },
    updateLine: function(enemy, baseSpeed, crBonus = 0, crPush = 0, crPushAlly = 0, speedDown,) {
      let content = "";
      if (enemy.name) {
        content += enemy.name;
        content += enemy.artifact ? " - " + enemy.artifact : "";
        content += enemy.hp
          ? " - " + this.formatHp(parseInt(enemy.hp)) + " " + this.$t("hp")
          : "";
        if (enemy.cr && baseSpeed) {
          let cr =
            enemy.outspeed === true ? parseInt(enemy.cr) + 100 : enemy.cr;
          cr = crPushAlly > 0 ? parseInt(cr) + parseInt(crPushAlly) : cr;
          cr = crPush > 0 ? parseInt(cr) - parseInt(crPush) : cr;
          cr = crBonus > 0 ? parseInt(cr) * 100/ (parseInt(crBonus) + 100) : cr;
          let speed =
            speedDown
              ? Math.round(cr/(100/baseSpeed+(cr-100)/(baseSpeed*0.7)))
              : Math.round((cr * baseSpeed) / 100);
          let speedRange =
            enemy.outspeed === true 
              ? Math.max(speed, baseSpeed) + "-" + Math.round(speed / 0.95)
              : speed + "-" + Math.round(speed / 0.95);
          content += " - " + speedRange + " " + this.$t("speed");
        }
        content += enemy.counter ? " - " + this.$t("setCounter") : "";
        content += enemy.immunity ? " - " + this.$t("setImmunity") : "";
        content += enemy.infos ? " - " + enemy.infos : "";
        content += "\r\n";
      }
      return content;
    },
    formatHp: function(num) {
      if ($("#locale-changer :selected").val() === "cn") {
        return Math.abs(num) > 9999
          ? Math.sign(num) * (Math.abs(num) / 10000).toFixed(2) +
              this.$t("formatHpK")
          : Math.sign(num) * Math.abs(num);
      } else if ($("#locale-changer :selected").val() === "tw") {
        return Math.abs(num) > 9999
          ? Math.sign(num) * (Math.abs(num) / 10000).toFixed(2) +
              this.$t("formatHpK")
          : Math.sign(num) * Math.abs(num);
      } else {
        return Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) +
              this.$t("formatHpK")
          : Math.sign(num) * Math.abs(num);
      }
    },
    copyToClipboard: function() {
      if ($("#report")) {
        $("#report").select();
        document.execCommand("copy");
        $(".toast").toast("hide");
        $("#copytoast").toast("show");
      }
    },
    copyToClipboardSL: function() {
      if ($("#report")) {
        let copyText = document.querySelector("#report");
        let ML = copyText._value;
        let SL = ML.replace(/(\r\n|\n|\r)/gm, " ");
        let slcopy = document.getElementById("sl");
        slcopy.value = SL;
        slcopy.select();
        document.execCommand("copy");
        $(".toast").toast("hide");
        $("#slcopytoast").toast("show");
      }
    },
    resetForm: function() {
      document.location.reload(true);
      $(".toast").toast("hide");
      $("#resettoast").toast("show");
    },
    toggleDarkMode: function(val) {
      if (val === true || val === "true") {
        document.body.classList.add("dark");
        this.darkMode = true;
      } else {
        document.body.classList.remove("dark");
        this.darkMode = false;
      }
      localStorage.setItem("darkMode", val);
    },
    changeLang: function() {
      localStorage.setItem("langCode", this.$i18n.locale);
      document.title = this.$t("title");
    }
  },
  updated: function() {
    $(".selectpicker").selectpicker("refresh");
    $('[data-toggle="tooltip"]').tooltip("_fixTitle");
  },
  mounted() {
    if (localStorage.getItem("darkMode")) {
      this.toggleDarkMode(localStorage.getItem("darkMode"));
    }
    let langCode = navigator.language || navigator.userLanguage;
    if (langCode === "zh-TW" || langCode === "zh-HK" || langCode === "zh-MO")
      langCode = "tw";
    if (langCode === "zh-CN" || langCode === "zh-SG") langCode = "cn";
    if (localStorage.getItem("langCode")) {
      langCode = localStorage.getItem("langCode");
    }
    i18n.locale = langCode;
    document.title = this.$t("title");
    $('[data-toggle="tooltip"]').tooltip({
      trigger: "hover"
    });
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>