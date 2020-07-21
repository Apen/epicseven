<template>
    <select :value="value" @change="select" class="selectpicker" :title="title" data-live-search="true" data-width="100%">
        <option v-for="item in artifacts" :key="item._id">
            {{item.name}}
        </option>
    </select>
</template>

<script>
    import $ from "jquery";
    import {en} from "@/assets/js/en.artifacts";
    import {fr} from "@/assets/js/fr.artifacts";
    import {cn} from "@/assets/js/cn.artifacts";
    import {tw} from "@/assets/js/tw.artifacts";

    export default {
        props: ['title', 'value'],
        data: function () {
            return {
                artifacts: this.getItems(),
            }
        },
        watch: {
            title: function () {
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
                    case 'cn':
                        artifacts = cn;
                        break;
                    case 'tw':
                        artifacts = tw;
                        break;
                    default:
                        artifacts = en;
                        break;
                }
                return artifacts;
            }
        }
    }
</script>