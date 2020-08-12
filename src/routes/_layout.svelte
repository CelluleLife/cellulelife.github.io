<script>
	import Nav from '../components/Nav.svelte';
	import ProfanityFilter from '../components/ProfanityFilter.svelte';
  import 'bulma/css/bulma.css';
	export let segment;
</script>

<style>
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
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -100;
		overflow: hidden;
	}

	video.background {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
		filter: blur(10px);
		z-index: -100;
		display: block;
		transform: scale(1.0);
		/* transform: scale(1.13); */
		overflow: hidden;
	}

	.title-wrapper {
		height: 100px;
		transition: height 300ms;
		font-size: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.page-title {
		align-self: center;
		justify-self: center;
		font-size: 42px;
		transition: font-size 300ms;
	}

	.hero-wrapper.home {
		height: 100vh;
	}

	.hero-wrapper.home .title-wrapper {
		height: calc(100vh - 80px);
	}

	.hero-wrapper.home .page-title {
		font-size: 80px;
	}
</style>

<div class="hero-wrapper {!segment && 'home' }">
	<div class="hero-inner-wrapper">
		<video loop muted autoplay class="background" src="/cellulelife-2.mp4"></video>
		<Nav class="main-nav" {segment}/>

		<div class="title-wrapper">
			<h1 class="page-title">
				{#if !segment }
					CELLULE LIFE
				{:else}
					{segment}
				{/if}
			</h1>
		</div>

		{#if segment }
			<main class="page">
				<slot></slot>
			</main>
			<ProfanityFilter></ProfanityFilter>
		{/if}
	</div>
</div>