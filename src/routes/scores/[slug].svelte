<script context="module">
	export async function preload(page, session) {
		const result = await this.fetch(process.env.API_URL_GET_HIGH_SCORES);

		let slug = page.params.slug;

		const highScoresBySeed = {};

		const data = await result.json();
		console.log({data});

			data.scores.map(score => {
				const seedLabel = score.seed_label;
				console.log({seedLabel})
				const modificationCount = score.modifications.length;

				if(!highScoresBySeed[seedLabel]) {
					highScoresBySeed[seedLabel] = {};
				}

				if(!highScoresBySeed[seedLabel][modificationCount]) {
					highScoresBySeed[seedLabel][modificationCount] = [];
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

    let scores = highScoresBySeed;
		console.log({slug})

		let links = [];

		if(slug) {
			scores = highScoresBySeed[slug];
			links = Object.keys(scores);
		}

		return {
			scores,
			slug,
			links
		};

	}
</script>

<script>
	import { onMount } from 'svelte';
	import SvelteTable from 'svelte-table';
	import SeedNav from '../../components/SeedNav.svelte';
	import { shouldShowUsernames } from '../../stores/ui';
	import seeds from '../../data/seeds.json';

	export let scores = {};
	export let slug = '';
	export let links = [];



</script>

<style>
</style>

<svelte:head>
	<title>Scores</title>
</svelte:head>

<div class="">
	<div class="">
		<h2>High Scores: {slug}</h2>
		<SeedNav slug={slug} links={links}></SeedNav>
		<div>
			<h2>Choose an edit count above.</h2>
		</div>
		<div>
			Random Scores:
			<div>
				TODO
			</div>
		</div>
	</div>
</div>