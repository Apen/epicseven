import {en} from "../assets/js/en.characters.js";
import {fr} from "../assets/js/fr.characters.js";
import {cn} from "../assets/js/cn.characters.js";
import {tw} from "../assets/js/tw.characters.js";
import {nicknames} from "../assets/js/nicknames.js";

export const ComponentSelectCharacter = {
    props: ['title', 'value'],
    data: function () {
        return {
            characters: this.getItems(),
            nicknames: nicknames,
        }
    },
    watch: {
        title: function (val, oldVal) {
            this.characters = this.getItems();
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
                case 'cn':
                    characters = cn;
                    break;
                case 'tw':
                    characters = tw;
                    break;
                default:
                    characters = en;
                    break;
            }
            return characters;
        },
        getTokens(item) {
            if (item._id && nicknames[item._id]) {
                return nicknames[item._id];
            }
        }
    },
    template:
        '<select :value="value" @change="select" class="selectpicker" :title="title" data-live-search="true" data-width="100%">\n' +
        '<option v-for="item in characters" :value="item.name" :data-tokens="getTokens(item)">\n' +
        '{{item.name}}\n' +
        '</option>\n' +
        '</select>'
}