<script>
	import Nav from '../components/Nav.svelte';
	import ProfanityFilter from '../components/ProfanityFilter.svelte';
  import 'bulma/css/bulma.css';
	export let segment;
</script>

<style lang="scss">
	main.page {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
		border: thin solid #dbdbdb;
		border-radius: 4px;
	}

	.hero-wrapper {
		display: flex;
		flex-direction: column;
		height: 400px;
		width: 100vw;
		transition: height 0.5s;
		position: relative;
	}

	.video-background-wrapper {
		position: fixed;
		top: -20px;
		bottom: calc(100vh - 400px);
		left: -20px;
		right: -20px;
		z-index: -100;
		overflow: hidden;
		transition: bottom 300ms;
	}

	video.background {
		/* position: absolute;
		top: 0;
		left: 0; */
		height: calc(100% + 20px);
		width: 100%;
		object-fit: cover;
		filter: blur(10px);
		z-index: -100;
		display: block;
		overflow: hidden;
	}

	.title-wrapper {
		height: 100px;
		transition: height 300ms;
		font-size: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 42px;
		text-align: center;
	}

	.page-title {
		align-self: center;
		justify-self: center;
		font-size: 42px;
		transition: font-size 300ms;
	}

	.hero-wrapper {


		&.home {
			height: 100vh;
			overflow-x: hidden;

			.hero-inner-wrapper {
				overflow: scroll-y;
			}


			.video-background-wrapper {
				bottom: -20px;
			}

			.title-wrapper {
				height: calc(100vh - 80px);
			}

			.page-title {
				font-size: 80px;
			}
		}
	}

	.home-page-route-wrapper {
		width: 100%;
	}
</style>

<div class="hero-wrapper {!segment && 'home' }">
	<div class="hero-inner-wrapper">
		<div class="video-background-wrapper">
			<video loop muted autoplay class="background" src="/cellulelife-2.mp4"></video>
		</div>
		<Nav class="main-nav" {segment}/>

		<div class="title-wrapper">
			<h1 class="page-title">
				{#if !segment }
					Cellule Life
				{:else}
					{segment}
				{/if}
			</h1>
			<div class="home-page-route-wrapper">
				{#if !segment }
					<slot></slot>
				{/if}
			</div>
		</div>

		{#if segment }
			<main class="page">
				<slot></slot>
			</main>
			<ProfanityFilter></ProfanityFilter>
		{/if}
	</div>
</div>