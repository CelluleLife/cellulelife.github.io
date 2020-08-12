<script context="module">
	export async function preload(page, session) {
		const result = await this.fetch(process.env.API_URL_GET_HIGH_SCORES);

		let { slug, editCount } = page.params;

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
            if(scoreA.active_count < scoreB.active_count) {
              return 1;
            } else if(scoreA.active_count > scoreB.active_count) {
              return -1;
            }
						return 0;
					}
				});
			});
      console.log({highScoresBySeed});

    let scores = highScoresBySeed;
    let links = [];
    console.log({slug})
		if(slug) {
      scores = highScoresBySeed[slug]
      links = Object.keys(scores);
    }

    if (editCount) {
      scores = scores[editCount]
    }

    const lowScores = [...scores].sort((scoreA, scoreB) => {
      if(scoreA.active_count > scoreB.active_count) {
        return 1;
      } else if(scoreA.active_count < scoreB.active_count) {
        return -1;
      } else {
        if(scoreA.step_count > scoreB.step_count) {
          return 1;
        } else if(scoreA.step_count < scoreB.step_count) {
          return -1;
        }
        return 0;
      }
    });

		return {
      scores,
      lowScores,
      slug,
      editCount,
      links
		};

	}
</script>

<script>
	import { onMount } from 'svelte';
  import SvelteTable from 'svelte-table';
  import SeedNav from '../../../components/SeedNav.svelte';
  import AnimatedPreview from '../../../components/AnimatedPreview.svelte';
  import LifeScoreDetails from '../../../components/score/LifeScoreDetails.svelte';
	import { shouldShowUsernames } from '../../../stores/ui';
	import seeds from '../../../data/seeds.json';

  export let slug = '';
  export let editCount = 0;
  export let links = [];
	export let scores = [];
  export let lowScores = [];

export const columns = [
  {
    key: "user_name",
    title: "User Name",
    value: v => v.user_name,
		sortable: true,
	},
  {
    key: "step_count",
    title: "Step Count",
    value: v => v.step_count,
		sortable: true,
	},
  {
    key: "active_count",
    title: "Active Count",
    value: v => v.active_count,
		sortable: true,
	},
];

export const maskedColumns = [...columns];
maskedColumns[0] = {
	key: "user_name",
	title: "User Name",
	value: v => '****',
	sortable: true,
};

let currentSeed;

onMount(() => {
  console.log({
    seeds,
    slug,
    // currentSeed
  })

  seeds.forEach(seed => {
    if(seed.name === slug) {
      currentSeed = seed;
    }
  })
});
</script>

<style>

.featured-scores {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.featured-score {
  width: 100%;
}

.featured-score-type-title {
  text-align: center;
  margin-bottom: 16px;
}

.featured-score-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.featured-score-details,
.featured-score-image-wrapper {
  width: 100%;
}

@media(min-width: 600px) {
  .featured-score {
    width: 50%;
  }

  .featured-score-details,
  .featured-score-image-wrapper {
    width: 50%;
  }

  .featured-life-score {
    padding-right: 20px;
    border-right: thin solid #eee;
  }

  .featured-death-score {
    padding-left: 20px;
  }
}

</style>

<svelte:head>
	<title>Scores</title>
</svelte:head>

<div class="">
	<div class="">
    {#if editCount !== '1'}
      <h2>High Scores: {slug} ({editCount} edits)</h2>
    {:else}
		  <h2>Scores: {slug} ({editCount} edit)</h2>
    {/if}
    <SeedNav slug={slug} links={links} currentEditCount={editCount}></SeedNav>
    <div class="featured-scores">
      <div class="featured-score featured-life-score">
        <h3 class="featured-score-type-title">Best Life Score</h3>
        <div class="featured-score-content">
          <div class="featured-score-details">
            <LifeScoreDetails
              score={scores[0]}
            ></LifeScoreDetails>
          </div>
          <div class="featured-score-image-wrapper" i18n>
            {#if currentSeed}
              <AnimatedPreview seed={currentSeed} modifications={scores[0].modifications} />
            {/if}
          </div>
        </div>
      </div>

      <div class="featured-score featured-death-score">
        <h3 class="featured-score-type-title">Best Death Score</h3>
        <div class="featured-score-content">
          <div class="featured-score-details">
            <LifeScoreDetails
              score={lowScores[0]}
            ></LifeScoreDetails>
          </div>
          <div class="featured-score-image-wrapper">
            {#if currentSeed}
              <AnimatedPreview seed={currentSeed} modifications={lowScores[0].modifications} />
            {/if}
          </div>
        </div>
      </div>
    </div>
    {#if $shouldShowUsernames}
      <SvelteTable  columns="{columns}" rows="{scores}"></SvelteTable>
    {:else}
      <SvelteTable  columns="{maskedColumns}" rows="{scores}"></SvelteTable>
    {/if}
	</div>
</div>