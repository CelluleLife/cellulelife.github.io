<script>
import {onMount, afterUpdate} from 'svelte';

export let seed;
export let modifications;

let canvas;

let mounted = false;

const drawCanvas = () => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, 500, 400);
    let frame;
    let currentIndex = 0;

		(function loop() {
      let isAlive = false;
      let isModification = false;

      while(!isAlive && !isModification && currentIndex < 2000) {
        isAlive = seed.cellules_string.charAt(currentIndex) === "1";
        isModification = modifications.find(modification => modification.grid_index === currentIndex);
        if(!isAlive && !isModification) {
          currentIndex += 1;
        }
      }
      if(currentIndex < 2000) {
        frame = requestAnimationFrame(loop);
      } else {
        return;
      }

      if(isModification) {
        ctx.fillStyle = 'red';
        } else {
        ctx.fillStyle = 'black';
      }

      const row = Math.floor(currentIndex / 50);
      let column = currentIndex - (row * 50);
      if(row === 0) {
        column = currentIndex;
      }

      console.log({
        column,
        row,
        currentIndex
      })


      ctx.fillRect(column * 10, row * 10, 10, 10);

      currentIndex++;

		}());

		return () => {
			cancelAnimationFrame(frame);
		};
  };

  onMount(() => {
    mounted = true;
    drawCanvas();
  });
  afterUpdate(() => {
    if(mounted) {
      drawCanvas()
    }
  });
</script>

<style>
canvas {
  width: 100%;
  height: auto;
}
</style>

<canvas
  height="400"
  width="500"
  bind:this={canvas}
></canvas>
