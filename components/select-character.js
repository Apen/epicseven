import {characters} from "../assets/js/characters.js";

export const ComponentSelectCharacter = {
    props: ['title', 'value'],
    data: function () {
        return {
            characters: characters
        }
    },
    methods: {
        select($event) {
            this.$emit('input', $event.target.value);
        }
    },
    template:
        '<select :value="value" @change="select" class="selectpicker" :title="title" data-live-search="true">\n' +
        '<option v-for="item in characters" :value="item.name">\n' +
        '{{item.name}}\n' +
        '</option>\n' +
        '</select>'
}