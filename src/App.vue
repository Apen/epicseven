<template>
    <div>
        <div class="container" style="margin-top:10px;">
            <div class="row">
                <div class="col-md-6">
                    <h1>{{ $t('title') }}</h1>
                </div>
                <div class="col-md-6">
                    <div class="custom-control custom-switch float-right">
                        <input type="checkbox" class="custom-control-input" id="darkSwitch" v-model="darkMode"/>
                        <label class="custom-control-label" for="darkSwitch">{{ $t('darkMode') }}</label>
                    </div>
                    <div class="locale-changer float-right mr-3">
                        <select id="locale-changer" v-model="$i18n.locale" style="height: 26px;" @change="changeLang()">
                            <option v-for="(lang) in langs" :value="lang.code" :key="lang.code">{{ lang.name }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <hr/>

            <div class="form-group">
                <input type="text" v-model="tower" class="form-control" :placeholder="$t('tower')"/>
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
                </div>
            </div>

            <div class="tab-content">
                <div class="tab-pane active" id="t1">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectCharacter v-model="firstHero.name" :title="$t('firstHero')"></SelectCharacter>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="firstHero.speed" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('speed') }}</span>
                                </div>
                                <br/><small class="text-muted"> {{ $t('heroesSaved') }}</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="firstHero.crBonus" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('crBonus') }}</span>
                                </div>
                                <br/><small class="text-muted"> {{ $t('crBonusDesc') }}</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="firstHero.crPush" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('crPush') }}</span>
                                </div>
                                <br/><small class="text-muted"> {{ $t('crPushDesc') }}</small>
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <div class="form-row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectCharacter v-model="enemiesFirstHero.first.name" :title="$t('enemiesFirstHero')"></SelectCharacter>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectArtifact ref="enemiesFirstHeroFirst" v-model="enemiesFirstHero.first.artifact" :title="$t('enemiesFirstArtifact')"></SelectArtifact>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesFirstHero.first.hp" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('hp') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesFirstHero.first.cr" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('cr') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label data-toggle="tooltip" data-placement="top" :title="$t('outspeedDesc')">
                                    <input type="checkbox" v-model="enemiesFirstHero.first.outspeed"/> {{ $t('outspeed') }}
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesFirstHero.first.counter"/> <img src="assets/images/Counter.png"/>
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesFirstHero.first.immunity"/> <img src="assets/images/Immunity.png"/>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group">
                                <input type="text" v-model="enemiesFirstHero.first.infos" class="form-control" :placeholder="$t('extraInfos')"/>
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectCharacter v-model="enemiesFirstHero.second.name" :title="$t('enemiesSecondHero')"></SelectCharacter>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectArtifact v-model="enemiesFirstHero.second.artifact" :title="$t('enemiesSecondArtifact')"></SelectArtifact>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesFirstHero.second.hp" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('hp') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesFirstHero.second.cr" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('cr') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label data-toggle="tooltip" data-placement="top" :title="$t('outspeedDesc')">
                                    <input type="checkbox" v-model="enemiesFirstHero.second.outspeed"/> {{ $t('outspeed') }}
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesFirstHero.second.counter"/> <img src="assets/images/Counter.png"/>
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesFirstHero.second.immunity"/> <img src="assets/images/Immunity.png"/>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group">
                                <input type="text" v-model="enemiesFirstHero.second.infos" class="form-control" :placeholder="$t('extraInfos')"/>
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectCharacter v-model="enemiesFirstHero.third.name" :title="$t('enemiesThirdHero')"></SelectCharacter>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectArtifact v-model="enemiesFirstHero.third.artifact" :title="$t('enemiesThirdArtifact')"></SelectArtifact>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesFirstHero.third.hp" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('hp') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesFirstHero.third.cr" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('cr') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label data-toggle="tooltip" data-placement="top" :title="$t('outspeedDesc')">
                                    <input type="checkbox" v-model="enemiesFirstHero.third.outspeed"/> {{ $t('outspeed') }}
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesFirstHero.third.counter"/> <img src="assets/images/Counter.png"/>
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesFirstHero.third.immunity"/> <img src="assets/images/Immunity.png"/>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group">
                                <input type="text" v-model="enemiesFirstHero.third.infos" class="form-control" :placeholder="$t('extraInfos')"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="t2">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectCharacter v-model="secondHero.name" :title="$t('firstHero')"></SelectCharacter>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="secondHero.speed" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('speed') }}</span>
                                </div>
                                <br/><small class="text-muted"> {{ $t('heroesSaved') }}</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="secondHero.crBonus" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('crBonus') }}</span>
                                </div>
                                <br/><small class="text-muted"> {{ $t('crBonusDesc') }}</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="secondHero.crPush" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('crPush') }}</span>
                                </div>
                                <br/><small class="text-muted"> {{ $t('crPushDesc') }}</small>
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <div class="form-row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectCharacter v-model="enemiesSecondHero.first.name" :title="$t('enemiesFirstHero')"></SelectCharacter>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectArtifact v-model="enemiesSecondHero.first.artifact" :title="$t('enemiesFirstArtifact')"></SelectArtifact>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesSecondHero.first.hp" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('hp') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesSecondHero.first.cr" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('cr') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label data-toggle="tooltip" data-placement="top" :title="$t('outspeedDesc')">
                                    <input type="checkbox" v-model="enemiesSecondHero.first.outspeed"/> {{ $t('outspeed') }}
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesSecondHero.first.counter"/> <img src="assets/images/Counter.png"/>
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesSecondHero.first.immunity"/> <img src="assets/images/Immunity.png"/>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group">
                                <input type="text" v-model="enemiesSecondHero.first.infos" class="form-control" :placeholder="$t('extraInfos')"/>
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectCharacter v-model="enemiesSecondHero.second.name" :title="$t('enemiesSecondHero')"></SelectCharacter>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectArtifact v-model="enemiesSecondHero.second.artifact" :title="$t('enemiesSecondArtifact')"></SelectArtifact>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesSecondHero.second.hp" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('hp') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesSecondHero.second.cr" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('cr') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label data-toggle="tooltip" data-placement="top" :title="$t('outspeedDesc')">
                                    <input type="checkbox" v-model="enemiesSecondHero.second.outspeed"/> {{ $t('outspeed') }}
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesSecondHero.second.counter"/> <img src="assets/images/Counter.png"/>
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesSecondHero.second.immunity"/> <img src="assets/images/Immunity.png"/>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group">
                                <input type="text" v-model="enemiesSecondHero.second.infos" class="form-control" :placeholder="$t('extraInfos')"/>
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectCharacter v-model="enemiesSecondHero.third.name" :title="$t('enemiesThirdHero')"></SelectCharacter>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <SelectArtifact v-model="enemiesSecondHero.third.artifact" :title="$t('enemiesThirdArtifact')"></SelectArtifact>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesSecondHero.third.hp" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('hp') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group form-group">
                                <input v-model="enemiesSecondHero.third.cr" type="number" min="0" class="form-control"/>
                                <div class="input-group-append">
                                    <span class="input-group-text">{{ $t('cr') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label data-toggle="tooltip" data-placement="top" :title="$t('outspeedDesc')">
                                    <input type="checkbox" v-model="enemiesSecondHero.third.outspeed"/> {{ $t('outspeed') }}
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesSecondHero.third.counter"/> <img src="assets/images/Counter.png"/>
                                </label>
                                <label>
                                    <input type="checkbox" v-model="enemiesSecondHero.third.immunity"/> <img src="assets/images/Immunity.png"/>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group">
                                <input type="text" v-model="enemiesSecondHero.third.infos" class="form-control" :placeholder="$t('extraInfos')"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="result">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <button class="btn btn-secondary float-right" v-on:click="copyToClipboard">{{ $t('copyText') }}</button>
                                <button class="btn btn-secondary float-right mr-3" v-on:click="copyToClipboardSL">{{ $t('copyTextSL') }}</button>
                                <button class="btn btn-secondary float-right mr-3" v-on:click="resetForm">{{ $t('reset') }}</button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <textarea id="report" v-model="report" class="form-control mt-3" style="height:300px"></textarea>
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
    import Vue from 'vue';
    import VueI18n from 'vue-i18n'
    import ComponentSelectCharacter from "./components/SelectCharacter"
    import ComponentSelectArtifact from "./components/SelectArtifact"
    import {en} from "./lang/en.js";
    import {fr} from "./lang/fr.js";
    import {cn} from "./lang/cn.js";
    import {tw} from "./lang/tw.js";

    Vue.use(VueI18n)

    const i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: 'en',
        silentTranslationWarn: true,
        messages: {
            en: en,
            fr: fr,
            cn: cn,
            tw: tw
        },
    })

    require('@/assets/css/dark-mode.css');
    require('../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css');
    require('../node_modules/bootstrap-select/dist/js/bootstrap-select.min');

    export default {
        i18n,
        components: {
            'SelectCharacter': ComponentSelectCharacter,
            'SelectArtifact': ComponentSelectArtifact
        },
        data: function () {
            return {
                langs: [
                    {"code": "en", "name": "English"},
                    {"code": "fr", "name": "Français"},
                    {"code": "cn", "name": "简体中文"},
                    {"code": "tw", "name": "繁體中文"}
                ],
                firstHero: {
                    name: '',
                    speed: '',
                    crBonus: '',
                    crPush: '',
                },
                secondHero: {
                    name: '',
                    speed: '',
                    crBonus: '',
                    crPush: '',
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
            }
        },
        watch: {
            'firstHero.name': function (val) {
                if (val && localStorage.getItem(val)) {
                    this.firstHero.speed = localStorage.getItem(val);
                } else {
                    this.firstHero.speed = '';
                }
            },
            'secondHero.name': function (val) {
                if (val && localStorage.getItem(val)) {
                    this.secondHero.speed = localStorage.getItem(val);
                } else {
                    this.secondHero.speed = '';
                }
            },
            'firstHero.crBonus': function () {
                this.updateReport();
            },
            'firstHero.crPush': function () {
                this.updateReport();
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
            'secondHero.crBonus': function () {
                this.updateReport();
            },
            'secondHero.crPush': function () {
                this.updateReport();
            },
            tower: function () {
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
                contentT1 += this.updateLine(this.enemiesFirstHero.first, this.firstHero.speed, this.firstHero.crBonus, this.firstHero.crPush);
                contentT1 += this.updateLine(this.enemiesFirstHero.second, this.firstHero.speed, this.firstHero.crBonus, this.firstHero.crPush);
                contentT1 += this.updateLine(this.enemiesFirstHero.third, this.firstHero.speed, this.firstHero.crBonus, this.firstHero.crPush);
                if (contentT1 !== '') {
                    this.report += this.$t('t1') + "\r\n" + contentT1;
                }
                let contentT2 = '';
                contentT2 += this.updateLine(this.enemiesSecondHero.first, this.secondHero.speed, this.secondHero.crBonus, this.secondHero.crPush);
                contentT2 += this.updateLine(this.enemiesSecondHero.second, this.secondHero.speed, this.secondHero.crBonus, this.secondHero.crPush);
                contentT2 += this.updateLine(this.enemiesSecondHero.third, this.secondHero.speed, this.secondHero.crBonus, this.secondHero.crPush);
                if (contentT2 !== '') {
                    this.report += this.$t('t2') + "\r\n" + contentT2;
                }
            },
            updateLine: function (enemy, baseSpeed, crBonus = 0, crPush = 0) {
                let content = '';
                if (enemy.name) {
                    content += enemy.name;
                    content += enemy.artifact ? ' - ' + enemy.artifact : '';
                    content += enemy.hp ? ' - ' + this.formatHp(parseInt(enemy.hp)) + ' ' + this.$t('hp') : '';
                    if (enemy.cr && baseSpeed) {
                        let cr = enemy.outspeed === true ? parseInt(enemy.cr) + 100 : enemy.cr;
                        cr = crBonus > 0 ? parseInt(cr) / (parseInt(crBonus) + 100) : cr;
                        cr = crPush > 0 ? parseInt(cr) - parseInt(crPush) : cr;
                        let speed = crBonus > 0 ? Math.round(cr * baseSpeed) : Math.round((cr * baseSpeed) / 100);
                        let speedRange = speed + '-' + Math.round(speed / 0.95);
                        content += ' - ' + speedRange + ' ' + this.$t('speed');
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
                    return Math.abs(num) > 9999 ? Math.sign(num) * ((Math.abs(num) / 10000).toFixed(2)) + this.$t('formatHpK') : Math.sign(num) * Math.abs(num);
                } else if ($("#locale-changer :selected").val() === 'tw') {
                    return Math.abs(num) > 9999 ? Math.sign(num) * ((Math.abs(num) / 10000).toFixed(2)) + this.$t('formatHpK') : Math.sign(num) * Math.abs(num);
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
                    SL.select();
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
            changeLang: function () {
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
            $('[data-toggle="tooltip"]').tooltip({
                trigger: 'hover'
            })
        },
    }
</script>

<style>
    [v-cloak] {
        display: none;
    }
</style>