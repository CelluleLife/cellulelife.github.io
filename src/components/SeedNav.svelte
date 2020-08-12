<script>
	import { Button } from 'svelma';
	import { shouldShowUsernames, setShouldShowUsernames } from '../stores/ui';

	export function isSegmentActive(_segment, thisSegment) {
		if((!_segment && !thisSegment) || _segment === thisSegment) {
			return 'page';
		}
	}

  export let segment;
  export let links = [];
  export let slug = '';
  export let currentEditCount = '';
</script>

<style>

nav {
	padding: 16px;
}

ol {
	display: flex;
	flex-direction: row;
	align-items: center;
  list-style: none;
  justify-content: center;
}

li {
	margin-right: 24px;
}

li:last-child {
	margin: 0;
}

a[aria-current="page"] {
	text-decoration: underline;
}
</style>

<nav>
	<ol>

    { #each links as link}
		  <li>
        {#if link === currentEditCount}
          <Button type="is-primary" tag="a" href="/scores/{slug}/{link}">{link}</Button>
        {:else}
          <Button tag="a" href="/scores/{slug}/{link}">{link}</Button>
        {/if}
      </li>
    { /each }

	</ol>
</nav>
