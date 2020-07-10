import {en} from "../assets/js/en.characters.js";
import {fr} from "../assets/js/fr.artifacts.js";

export const ComponentSelectCharacter = {
    props: ['title', 'value'],
    data: function () {
        return {
            characters: this.getItems(),
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
            let characters = null;
            switch (this.$i18n.locale) {
                case 'en':
                    characters = en;
                    break;
                case 'fr':
                    characters = fr;
                    break;
                default:
                    characters = en;
                    break;
            }
            return characters;
        }
    },
    template:
        '<select :value="value" @change="select" class="selectpicker" :title="title" data-live-search="true" data-width="100%">\n' +
        '<option v-for="item in characters" :value="item.name">\n' +
        '{{item.name}}\n' +
        '</option>\n' +
        '</select>'
}