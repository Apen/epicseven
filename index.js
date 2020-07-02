var app = new Vue({
    el: '#app',
    data: {
        firstHero: {},
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
        firstHero: {
            deep: true,
            handler(val) {
                this.updateReport();
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
            console.log(this.enemies.first);
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
                    console.log(cr);
                    content += ' - ' + Math.round((cr * this.firstHero.speed) / 100) + ' speed';
                }
                content += enemy.infos ? ' - ' + enemy.infos : '';
                content += "\r\n";
            }
            console.log(content);
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

