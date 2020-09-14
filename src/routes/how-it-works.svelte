<script>

import SplitSvg from '../../static/score.svg';
import WeightSvg from '../../static/weight.svg';
import ScoreSvg from '../../static/score.svg';

const svgProps = {
	width: '80%',
	height: 'auto',
	fill: '#f69d3c',
	// stroke: 'rgba(0,0,0,0.2)',
};

let shouldAnimate = false;
setTimeout(() => {
  shouldAnimate = true;
}, 1000)

</script>
<style lang="scss">

  .how-it-works-description {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
    margin-bottom: 16px;
  }

  .how-it-works-list {
    margin: 0 auto;
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;

    li {
      display: block;
      width: 100%;
    }

    .slide-animation-wrapper {
      max-width: 300px;
      transition: margin-left 300ms;
      margin-left: 0;

      &.first {
        &.done {
          margin-left: calc(33% - 150px);
        }
      }
      &.second {
        &.done {
          margin-left: calc(50% - 150px);
        }

      }
      &.third {
        &.done {
          margin-left: calc(66% - 150px);
        }
      }
    }
  }

  .descriptions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
  }

  .game-mode-description {
    width: 100%;
  }

  .game-mode-header {
    text-align: center;
  }

  .game-mode-title {
    font-size: 26px;
  }

  .game-mode-image {
    width: 300px;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
  }

  @media(min-width: 600px) {
    .game-mode-description {
      width: 50%;
    }
  }


  svg {
    filter: drop-shadow(0,0,5px, #000);
  }
</style>

<svelte:head>
	<title>How it Works</title>
</svelte:head>

<h1>Getting Started</h1>
<p class="how-it-works-description">At its heart, this is just a Game of Life sandbox. Relax and just watch it unfold. If you want to try and make it into the High scores, read on.</p>
<ul class="how-it-works-list">
  <li>
    <div class="slide-animation-wrapper first {shouldAnimate && 'done'}">
      <div><SplitSvg {...svgProps} /></div>
      <div>The game consists of 2 main "games", a game of Life and a game of Death</div>
    </div>
  </li>
  <li>
    <div class="slide-animation-wrapper second {shouldAnimate && 'done'}">
      <div><WeightSvg {...svgProps} /></div>
      <div>They are both played in the same game mode, we just weight various metrics differently.</div>
    </div>
  </li>
  <li>
    <div class="slide-animation-wrapper third {shouldAnimate && 'done'}">
      <div><ScoreSvg {...svgProps} /></div>
      <div>
        At the end, we check to see if you might have made it ontoto the high score list for your seed and edit count.
      </div>
    </div>
  </li>
</ul>
  <div class="warning">There will eventually be more game modes with more levels of interaction. Stay Tuned!!!</div>

<div class="descriptions">
  <div class="game-mode-description">
    <div class="game-mode-header">
      <h2 class="game-mode-title">Life Score</h2>
      <img class="game-mode-image"
    src="https://www.fillmurray.com/300/300" alt="Life Score animation" />
    </div>
    <p>The main goal is to achieve a high Life Score by making the game live as long as possible. We then compare your results with other results that were created using the same edit counts. An edit is toggling a cell on or off. There is no penalty to a toggle, its just a different high score list.</p>
  </div>
  <div class="game-mode-description">
    <div class="game-mode-header">
      <h2 class="game-mode-title">Death Score</h2>
      <img class="game-mode-image" src="https://www.placecage.com/c/300/300" alt="Death Score animation" />
    </div>
    <p>There is also the concept of a Death Score. How empty can you leave the board? The amount of living cells at the end is the primary metric here. In the event of a tie, a shorter lifespan is better.</p>
  </div>
</div>