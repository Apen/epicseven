<template>
  <div class="">
    <div class="form-row">
      <div class="col-md-3">
        <div class="form-group">
          <SelectCharacter v-model="hero.name" :title="$t('firstHero')" />
        </div>
      </div>
      <div class="col-md-3">
        <div class="input-group form-group">
          <input v-model.number="hero.speed" type="number" min="0" class="form-control" />
          <div class="input-group-append">
            <span class="input-group-text">{{ $t('speed') }}</span>
          </div>
          <br /><small class="text-muted"> {{ $t('heroesSaved') }}</small>
        </div>
      </div>
      <div class="col-md-3">
        <div class="input-group form-group">
          <input v-model="hero.crBonus" type="number" min="0" class="form-control" />
          <div class="input-group-append">
            <span class="input-group-text">{{ $t('crBonus') }}</span>
          </div>
          <br /><small class="text-muted"> {{ $t('crBonusDesc') }}</small>
        </div>
      </div>
      <div class="col-md-3">
        <div class="input-group form-group">
          <input v-model="hero.crPush" type="number" min="0" class="form-control" />
          <div class="input-group-append">
            <span class="input-group-text">{{ $t('crPush') }}</span>
          </div>
          <br /><small class="text-muted"> {{ $t('crPushDesc') }}</small>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3" />
      <div class="col-md-4">
        <div class="input-group form-group">
          <input v-model="hero.crPushAlly" type="number" min="0" class="form-control" />
          <div class="input-group-append">
            <span class="input-group-text">{{ $t('crPushAlly') }}</span>
          </div>
          <br /><small class="text-muted"> {{ $t('crPushAllyDesc') }}</small>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label>
            <input v-model="hero.speedDown" type="checkbox" class="mr-2" />
            <img src="assets/images/Speed_down.png" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ComponentSelectCharacter from './SelectCharacter.vue';

export interface Hero {
  name: string;
  speed: number;
  crBonus: number;
  crPush: number;
  crPushAlly: number;
  speedDown: boolean;
}

export default Vue.extend({
  components: {
    SelectCharacter: ComponentSelectCharacter,
  },
  props: {
    hero: Object as PropType<Hero>,
  },
});
</script>
