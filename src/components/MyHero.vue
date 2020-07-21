<template>
    <div class="row">
        <div class="col-md-3">
            <div class="form-group">
                <SelectCharacter v-model="hero.name" :title="$t('firstHero')"></SelectCharacter>
            </div>
        </div>
        <div class="col-md-3">
            <div class="input-group form-group">
                <input v-model="hero.speed" type="number" min="0" class="form-control"/>
                <div class="input-group-append">
                    <span class="input-group-text">{{ $t('speed') }}</span>
                </div>
                <br/><small class="text-muted"> {{ $t('heroesSaved') }}</small>
            </div>
        </div>
        <div class="col-md-3">
            <div class="input-group form-group">
                <input v-model="hero.crBonus" type="number" min="0" class="form-control"/>
                <div class="input-group-append">
                    <span class="input-group-text">{{ $t('crBonus') }}</span>
                </div>
                <br/><small class="text-muted"> {{ $t('crBonusDesc') }}</small>
            </div>
        </div>
        <div class="col-md-3">
            <div class="input-group form-group">
                <input v-model="hero.crPush" type="number" min="0" class="form-control"/>
                <div class="input-group-append">
                    <span class="input-group-text">{{ $t('crPush') }}</span>
                </div>
                <br/><small class="text-muted"> {{ $t('crPushDesc') }}</small>
            </div>
        </div>
    </div>
</template>

<script>
    import ComponentSelectCharacter from "./SelectCharacter"
    export default {
        props: ['hero'],
        components: {
            'SelectCharacter': ComponentSelectCharacter,
        },
    }
</script>