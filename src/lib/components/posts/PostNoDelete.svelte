<script lang="ts">
  import {i18n} from '../../stores/i18n.store';
  import IconDelete from '../icons/IconDelete.svelte';
  import Popover from '../ui/Popover.svelte';

  let visible = false;
</script>

<button
  class="icon"
  type="button"
  on:click|stopPropagation={() => (visible = true)}
  aria-label={$i18n.core.delete}>
  <IconDelete />
</button>

<Popover bind:visible center={true}>
  <div class="content">
    <p>{$i18n.settings.no_delete}</p>

    <button type="button" on:click|stopPropagation={() => (visible = false)}>
      {$i18n.core.ok}
    </button>
  </div>
</Popover>

<style lang="scss">
  @use '../../themes/mixins/overlay';

  .content {
    @include overlay.content;
  }

  p {
    margin: 0;
  }
</style>
