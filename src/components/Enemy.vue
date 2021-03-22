<template>
  <div>
    <div class="form-row">
      <div class="col-md-3">
        <div class="form-group">
          <SelectCharacter v-model="enemy.name" :title="labelHero" />
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <SelectArtifact v-model="enemy.artifact" :title="labelArtifact" />
        </div>
      </div>
      <div class="col-md-3">
        <div class="input-group form-group">
          <input v-model="enemy.hp" type="number" min="0" class="form-control" />
          <div class="input-group-append">
            <span class="input-group-text">{{ $t('hp') }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="input-group form-group">
          <input v-model="enemy.cr" type="number" min="0" class="form-control" />
          <div class="input-group-append">
            <span class="input-group-text">{{ $t('cr') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="form-group">
          <label data-toggle="tooltip" data-placement="top" :title="$t('outspeedDesc')" class="mr-4">
            <input v-model="enemy.outspeed" type="checkbox" />
            {{ $t('outspeed') }}
          </label>
          <label class="mr-2">
            <input v-model="enemy.counter" type="checkbox" />
            <img src="assets/images/Counter.png" />
          </label>
          <label>
            <input v-model="enemy.immunity" type="checkbox" />
            <img src="assets/images/Immunity.png" />
          </label>
        </div>
      </div>
      <div class="col-md-9">
        <div class="form-group">
          <input v-model="enemy.infos" type="text" class="form-control" :placeholder="$t('extraInfos')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentSelectCharacter from './SelectCharacter.vue';
import ComponentSelectArtifact from './SelectArtifact.vue';

export default {
  components: {
    SelectCharacter: ComponentSelectCharacter,
    SelectArtifact: ComponentSelectArtifact,
  },
  props: {
    enemy: Object,
    labelHero: String,
    labelArtifact: String,
  },
};
</script>
