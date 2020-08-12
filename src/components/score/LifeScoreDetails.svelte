<script>
import {onMount, afterUpdate} from 'svelte';

import { shouldShowUsernames } from '../../stores/ui';
export let score;

let metrics = [];

afterUpdate(() => {
  metrics = [
    {
      label: "Step Count",
      value: score.step_count,
    },
    {
      label: "Active Count",
      value: score.active_count,
    },
    {
      label: "User Name",
      value: score.user_name,
      is_username: true
    },
  ];
})

</script>

<style>

.metrics {
  margin: 0;
  padding: 0;
}

.metric {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.label {
  text-align: right;
  width: 50%;
  margin-bottom: 0;
  padding-right: 12px;
}

.value {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  width: 50%;
}

</style>

<ul class="metrics">
  {#each metrics as metric}
    <li class="metric">
      <div class="label">{metric.label}</div>
      {#if metric.is_username && !$shouldShowUsernames}
        <div class="value">****</div>
      {:else}
        <div class="value">{metric.value}</div>
      {/if}
    </li>
  {/each}
</ul>
