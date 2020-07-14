import {ComponentSelectCharacter} from "./components/select-character.js"
import {ComponentSelectArtifact} from "./components/select-artifact.js"
import {en} from "./lang/en.js";
import {fr} from "./lang/fr.js";
import {cn} from "./lang/cn.js";
import {tw} from "./lang/tw.js";

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: en,
        fr: fr,
        cn: cn,
        tw: tw
    },
})

const app = new Vue({
    el: '#app',
    i18n,
    components: {
        'select-character': ComponentSelectCharacter,
        'select-artifact': ComponentSelectArtifact
    },
    data: {
        langs: [{"code": "en", "name": "English"}, {"code": "fr", "name": "Français"}, {"code": "cn", "name": "简体中文"}, {"code": "tw", "name": "繁體中文"}],
        firstHero: {
            name: '',
            speed: '',
            crBonus: '',
        },
        secondHero: {
            name: '',
            speed: '',
            crBonus: '',
        },
        enemiesFirstHero: {
            first: {},
            second: {},
            third: {},
        },
        enemiesSecondHero: {
            first: {},
            second: {},
            third: {},
        },
        tower: '',
        report: '',
        darkMode: false
    },
    watch: {
        'firstHero.name': function (val, oldVal) {
            if (val && localStorage.getItem(val)) {
                this.firstHero.speed = localStorage.getItem(val);
            } else {
                this.firstHero.speed = '';
            }
        },
        'secondHero.name': function (val, oldVal) {
            if (val && localStorage.getItem(val)) {
                this.secondHero.speed = localStorage.getItem(val);
            } else {
                this.secondHero.speed = '';
            }
        },
        'firstHero.speed': function (val) {
            if (this.firstHero.name && val) {
                localStorage.setItem(this.firstHero.name, val);
            }
        },
        'secondHero.speed': function (val) {
            if (this.secondHero.name && val) {
                localStorage.setItem(this.secondHero.name, val);
            }
        },
        tower: function (val) {
            this.updateReport();
        },
        enemiesFirstHero: {
            deep: true,
            handler(val) {
                this.updateReport();
            }
        },
        enemiesSecondHero: {
            deep: true,
            handler(val) {
                this.updateReport();
            }
        },
        darkMode: function (val) {
            this.toggleDarkMode(val);
        },
    },
    methods: {
        updateReport: function () {
            this.report = '';
            if (this.tower) {
                this.report += "** " + this.tower + " **\r\n"
            }
            let contentT1 = '';
            contentT1 += this.updateLine(this.enemiesFirstHero.first, this.firstHero.speed, this.firstHero.crBonus);
            contentT1 += this.updateLine(this.enemiesFirstHero.second, this.firstHero.speed, this.firstHero.crBonus);
            contentT1 += this.updateLine(this.enemiesFirstHero.third, this.firstHero.speed, this.firstHero.crBonus);
            if (contentT1 !== '') {
                this.report += this.$t('t1') + "\r\n" + contentT1;
            }
            let contentT2 = '';
            contentT2 += this.updateLine(this.enemiesSecondHero.first, this.secondHero.speed, this.secondHero.crBonus);
            contentT2 += this.updateLine(this.enemiesSecondHero.second, this.secondHero.speed, this.secondHero.crBonus);
            contentT2 += this.updateLine(this.enemiesSecondHero.third, this.secondHero.speed, this.secondHero.crBonus);
            if (contentT2 !== '') {
                this.report += this.$t('t2') + "\r\n" + contentT2;
            }
        },
        updateLine: function (enemy, baseSpeed, crBonus = 0) {
            let content = '';
            if (enemy.name) {
                content += enemy.name;
                content += enemy.artifact ? ' - ' + enemy.artifact : '';
                content += enemy.hp ? ' - ' + this.formatHp(parseInt(enemy.hp)) + ' ' + this.$t('hp') : '';
                if (enemy.cr && baseSpeed) {
                    let cr = enemy.outspeed === true ? parseInt(enemy.cr) + 100 : enemy.cr;
                    console.log(cr);
                    cr = crBonus > 0 ? parseInt(cr) + parseInt(crBonus) : cr;
                    console.log(cr);
                    content += ' - ' + Math.round((cr * baseSpeed) / 100) + ' ' + this.$t('speed');
                    console.log('speed : '+Math.round((cr * baseSpeed) / 100));
                }
                content += enemy.counter ? ' - ' + this.$t('setCounter') : '';
                content += enemy.immunity ? ' - ' + this.$t('setImmunity') : '';
                content += enemy.infos ? ' - ' + enemy.infos : '';
                content += "\r\n";
            }
            return content;
        },
        formatHp: function (num) {
            if ($("#locale-changer :selected").val() === 'cn') {
                return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 10000).toFixed(2)) + this.$t('formatHpK') : Math.sign(num) * Math.abs(num);
            } else if ($("#locale-changer :selected").val() === 'tw') {
                return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 10000).toFixed(2)) + this.$t('formatHpK') : Math.sign(num) * Math.abs(num);
            } else {
                return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + this.$t('formatHpK') : Math.sign(num) * Math.abs(num);
            }
        },
        copyToClipboard: function () {
            if ($('#report')) {
                $('#report').select();
                document.execCommand("copy");
            }
        },
        copyToClipboardSL: function () {
            if ($('#report')) {
                var copyText = document.querySelector("#report");
                var ML = copyText._value;
                var SL = ML.replace(/(\r\n|\n|\r)/gm, " ");
                var slcopy = document.getElementById("sl");
                slcopy.value = SL;
                sl.select();
                document.execCommand("copy");
            }
        },
        resetForm: function () {
            document.location.reload(true);
        },
        toggleDarkMode: function (val) {
            if (val === true || val === 'true') {
                document.body.classList.add('dark');
                this.darkMode = true;
            } else {
                document.body.classList.remove('dark');
                this.darkMode = false;
            }
            localStorage.setItem('darkMode', val);
        },
        changeLang: function (val) {
            localStorage.setItem('langCode', this.$i18n.locale);
            document.title = this.$t('title');
        }
    },
    updated: function () {
        $('.selectpicker').selectpicker('refresh');
        $('[data-toggle="tooltip"]').tooltip('_fixTitle');
    },
    mounted() {
        if (localStorage.getItem('darkMode')) {
            this.toggleDarkMode(localStorage.getItem('darkMode'));
        }
        let langCode = navigator.language || navigator.userLanguage;
        if (langCode === "zh-TW" || langCode === "zh-HK" || langCode === "zh-MO") langCode = "tw";
        if (langCode === "zh-CN" || langCode === "zh-SG") langCode = "cn";
        if (localStorage.getItem('langCode')) {
            langCode = localStorage.getItem('langCode');
        }
        i18n.locale = langCode;
        document.title = this.$t('title');
    },
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    })
});

