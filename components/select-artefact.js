import {artefacts} from "../artefacts.js";

export const ComponentSelectArtefact = {
    props: ['title', 'value'],
    data: function () {
        return {
            artefacts: artefacts
        }
    },
    methods: {
        select($event) {
            this.$emit('input', $event.target.value);
        }
    },
    template:
        '<select :value="value" @change="select" class="selectpicker" :title="title" data-live-search="true">\n' +
        '<option v-for="item in artefacts" :value="item.name">\n' +
        '{{item.name}}\n' +
        '</option>\n' +
        '</select>'
}
