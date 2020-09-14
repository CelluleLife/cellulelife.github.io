<script>
	import { Button } from 'svelma';

	export function isSegmentActive(_segment, thisSegment) {
		if((!_segment && !thisSegment) || _segment === thisSegment) {
			return 'page';
		}
	}

	export let segment;
</script>

<style lang="scss">

nav {
	padding: 16px;
	background: rgb(246, 157, 60);
	color: #000;

	a, a.nav-title-link {
		color: #000;
		text-decoration:  none;
	}
}

ul {
	display: flex;
	flex-direction: row;
	align-items: center;
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
	<ul>
		<li><a class="nav-title-link" aria-current="{isSegmentActive(segment)}" href=".">
			<h1>Cellule Life</h1>
		</a></li>

		<li class="spacer"></li>

		<li><a aria-current="{isSegmentActive(segment, 'how-it-works')}" href="how-it-works">How it Works</a></li>

		<li><a aria-current="{isSegmentActive(segment, 'scores')}" href="scores">High Scores</a></li>

		<li class="spacer"></li>

		<li><Button tag="a" href="game">Play the Game!</Button></li>

	</ul>
</nav>
