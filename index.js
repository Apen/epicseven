var app = new Vue({
    el: '#app',
    data: {
        firstHero: {
            name: '',
            speed: ''
        },
        enemies: {
            first: {},
            second: {},
            third: {},
        },
        report: '',
        characters: characters,
        artefacts: artefacts,
    },
    watch: {
        'firstHero.name': function (val, oldVal) {
            if (val && !this.firstHero.speed) {
                if (localStorage.getItem(val)) {
                    console.log('get localStorage : ' + val);
                    this.firstHero.speed = localStorage.getItem(val);
                }
            } else {
                this.firstHero.speed = '';
            }
        },
        'firstHero.speed': function (val) {
            if (this.firstHero.name && val) {
                console.log('save localStorage : ' + this.firstHero.name + ' ' + val);
                localStorage.setItem(this.firstHero.name, val);
            }
        },
        enemies: {
            deep: true,
            handler(val) {
                this.updateReport();
            }
        }
    },
    methods: {
        updateReport: function () {
            this.report = '';
            this.report += this.updateLine(this.enemies.first);
            this.report += this.updateLine(this.enemies.second);
            this.report += this.updateLine(this.enemies.third);
        },
        updateLine: function (enemy) {
            let content = '';
            if (enemy.name) {
                content += enemy.name;
                content += enemy.artefact ? ' - ' + enemy.artefact : '';
                content += enemy.hp ? ' - ' + enemy.hp + 'HP' : '';
                if (enemy.cr && this.firstHero.speed) {
                    let cr = enemy.outspeed === true ? parseInt(enemy.cr) + 100 : enemy.cr;
                    content += ' - ' + Math.round((cr * this.firstHero.speed) / 100) + ' speed';
                }
                content += enemy.infos ? ' - ' + enemy.infos : '';
                content += "\r\n";
            }
            return content;
        },
        copyToClipboard: function () {
            if ($('#report')) {
                $('#report').select();
                document.execCommand("copy");
            }
        },
        resetForm: function () {
            document.location.reload(true);
        }
    }
});

