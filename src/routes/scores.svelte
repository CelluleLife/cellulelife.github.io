<script context="module">
	export async function preload() {
		const result = await this.fetch(process.env.API_URL_GET_HIGH_SCORES);

		const highScoresBySeed = {};

		const data = await result.json();
		console.log({data});

			data.scores.map(score => {
				const seedLabel = score.seed_label;
				console.log({seedLabel})
				const modificationCount = score.modifications.length;

				if(!highScoresBySeed[seedLabel]) {
					highScoresBySeed[seedLabel] = {
						count: 0,
						highestSteps: 0,
					};
				}

				if(!highScoresBySeed[seedLabel][modificationCount]) {
					highScoresBySeed[seedLabel][modificationCount] = [];
				}

				highScoresBySeed[seedLabel].count += 1;
				if(score.step_count > highScoresBySeed[seedLabel].highestSteps) {
					highScoresBySeed[seedLabel].highestSteps = score.step_count;
				}

				highScoresBySeed[seedLabel][modificationCount].push(score);

				highScoresBySeed[seedLabel][modificationCount].sort((scoreA, scoreB) => {
					if(scoreA.step_count < scoreB.step_count) {
						return 1;
					} else if(scoreA.step_count > scoreB.step_count) {
						return -1;
					} else {
						return 0;
					}
				});


			});
				console.log({highScoresBySeed});

		return {
			scores: highScoresBySeed
		};

		// TODO: Optimize sorting by extracting to separate step;
	}
</script>

<script>
	import seedImageUrls from '../data/seed-image-urls.json';
	import slugify from '../util/slugify';

	function getSeedImageUrl(seedName) {
		return `/seed-images/${slugify(seedName)}.png`;
	}

	import { onMount } from 'svelte';
	export let scores = {};
</script>

<style>
.tiles-container {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-around;
}

.tile-wrapper {
	width: 200px;
}

img {
	height: auto;
	width: 100%;
}
</style>

<svelte:head>
	<title>Scores</title>
</svelte:head>

<div class="tiles-container">
{#each Object.keys(scores) as seed, seedIndex}
	<div class="tile-wrapper">
		<a href="/scores/{seed}">
			<img
				src="{getSeedImageUrl(seed)}"
				alt="Starting Seed Map: {seed}"
			/>
			<h3>{seed}</h3>
			<div>High Score: {scores[seed].highestSteps}</div>
			<div>Count: {scores[seed].count}</div>
		</a>
	</div>
{/each}
</div>