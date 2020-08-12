<script>
  import { onMount } from 'svelte';
  import { Button, Switch } from 'svelma';
	import { shouldShowUsernames, setShouldShowUsernames } from '../stores/ui';

  export let container;

  onMount(() => {
    document.body.appendChild(container);
  });
</script>

<style>

.filter-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
}

.filter-wrapper :global(.button) {
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom: 0;
  border-left: 0;
  padding: 40px 34px 34px;
}

.filter-wrapper :global(.switch) {
  pointer-events: none;
}

</style>

<div
    bind:this={container}
    class="filter-wrapper"
    tabindex="-1"
>
  <Button
    on:click={setShouldShowUsernames(!$shouldShowUsernames)}
    size="is-large"
  >
    <Switch
      class="switch"
      bind:checked={$shouldShowUsernames}
      type="is-danger"
    >
      Show Usernames
    </Switch>
  </Button>
</div>