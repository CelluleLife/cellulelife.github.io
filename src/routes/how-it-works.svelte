<style>

  .how-it-works-description {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
    margin-bottom: 16px;
  }

  .how-it-works-list {
    margin: 0 auto;
    width: 400px;
    max-width: 100%;
    list-style: disc;
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
</style>

<svelte:head>
	<title>How it Works</title>
</svelte:head>

<h1>Getting Started</h1>
<p class="how-it-works-description">At its heart, this is just a Game of Life sandbox. Relax and just watch it unfold. If you want to try and make it into the High scores, read on.</p>
<ul class="how-it-works-list">
  <li>The game consists of 2 main "games".</li>
  <li>They are both played in the same game mode, we just weight various metrics differently.</li>
  <li class="warning">There will eventually be more game modes with more levels of interaction. Stay Tuned!!!</li>
</ul>

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