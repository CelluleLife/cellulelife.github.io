<script>
import SettingsSvg from '../../static/settings.svg';
import AwardSvg from '../../static/award.svg';
import RunSvg from '../../static/run.svg';

const svgProps = {
	width: '80%',
	height: 'auto',
	fill: '#f69d3c',
	stroke: 'rgba(0,0,0,0.2)',
};
</script>


<style  lang="scss">
	.calls-to-action {
		display: flex;
		justify-content: center;

		.call-to-action-wrapper {
			width: 33.3%;
			// max-width: 400px;
		}
	}

</style>

<svelte:head>
	<title>Cellulelife - The Gamified Game of Life</title>
</svelte:head>

<p>Go for high scores or just click around.</p>

<h2>The choice is yours.</h2>

<div class="calls-to-action">
	<a href="/how-it-works" class="call-to-action-wrapper">
		<SettingsSvg {...svgProps} />
		<h3>See how it works</h3>
	</a>
	<a href="/scores" class="call-to-action-wrapper">
		<AwardSvg {...svgProps} />
		<h3>View the High Scores</h3>
	</a>
	<a href="/game" class="call-to-action-wrapper">
		<RunSvg {...svgProps} />
		<h3>Jump into the game</h3>
	</a>
</div>