import {en} from "../assets/js/en.artifacts.js";
import {fr} from "../assets/js/fr.artifacts.js";

export const ComponentSelectArtifact = {
    props: ['title', 'value'],
    data: function () {
        return {
            artifacts: this.getItems(),
        }
    },
    watch: {
        title: function (val, oldVal) {
            this.artifacts = this.getItems();
        }
    },
    updated: function () {
        $(this.$el).selectpicker({title: this.title}).selectpicker('render');
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
                default:
                    artifacts = en;
                    break;
            }
            return artifacts;
        }
    },
    template:
        '<select :value="value" @change="select" class="selectpicker" :title="title" data-live-search="true" data-width="100%">\n' +
        '<option v-for="item in artifacts" :value="item.name">\n' +
        '{{item.name}}\n' +
        '</option>\n' +
        '</select>'
}
