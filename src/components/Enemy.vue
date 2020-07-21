<template>
    <div>
        <div class="form-row">
            <div class="col-md-3">
                <div class="form-group">
                    <SelectCharacter v-model="enemy.name" :title="labelHero"></SelectCharacter>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <SelectArtifact v-model="enemy.artifact" :title="labelArtifact"></SelectArtifact>
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group form-group">
                    <input v-model="enemy.hp" type="number" min="0" class="form-control"/>
                    <div class="input-group-append">
                        <span class="input-group-text">{{ $t('hp') }}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group form-group">
                    <input v-model="enemy.cr" type="number" min="0" class="form-control"/>
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
                        <input type="checkbox" v-model="enemy.outspeed"/> {{ $t('outspeed') }}
                    </label>
                    <label>
                        <input type="checkbox" v-model="enemy.counter"/> <img src="assets/images/Counter.png"/>
                    </label>
                    <label>
                        <input type="checkbox" v-model="enemy.immunity"/> <img src="assets/images/Immunity.png"/>
                    </label>
                </div>
            </div>
            <div class="col-md-9">
                <div class="form-group">
                    <input type="text" v-model="enemy.infos" class="form-control" :placeholder="$t('extraInfos')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ComponentSelectCharacter from "./SelectCharacter"
    import ComponentSelectArtifact from "./SelectArtifact"

    export default {
        props: {
            enemy: Object,
            labelHero: String,
            labelArtifact: String,
        },
        components: {
            'SelectCharacter': ComponentSelectCharacter,
            'SelectArtifact': ComponentSelectArtifact,
        },
    }
</script>