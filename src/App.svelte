<script>
  import Button from './lib/Button.svelte'
  import Status from './lib/Status.svelte';

  // status numbers
  let physical = 10;
  let mental = 10;
  // let career = 10;
  // let education = 10;

  // initial scenario art card
  let src = '/src/assets/soccer1.jpg';

  // initial scenario caption
  let caption = "Your daughter has a soccer tournament but your boss needs you to stay behind for an important project at work. Will you make it to her game?";

  // number of decisions
  let decisions = 0;

  function accept() {

    // it can change the art card
    src = '/src/assets/homework.jpg';

    // it can change the caption
    caption = "You've finished your homework. You know you could do a better job, but your friends are playing outside. Do you join them?";

    // it can change the statuses
    mental += 1;

    /* 
     * TODO: 
     * these variables will be pulled from the 
     * event object the game loop function 
     * returns rather than set manually 
     */

    decisions++;
  }

  function decline() {
    src = '/src/assets/homework.jpg';

    caption = "You've finished your homework. You know you could do a better job, but your friends are playing outside. Do you join them?";

    mental -= 2;

    decisions++;
  }
</script>

<main>

  <div id="statuses">
    <Status num={physical} src="/src/assets/physical.jpg" />
    <Status num={mental} src="/src/assets/mental.jpg" />
  </div>

  <h1>Balance, Life, Decide!</h1>

  <div id="scenario-art">
    <img {src} alt="Put Scenario Name Here!" />
  </div>

  <div id="scenario-caption">
    <p>{caption}</p>
  </div>

  <div id="buttons">
    <Button text="Yes" on:toggle={accept}/>
    <Button text="No" on:toggle={decline}/>
  </div>

  <div id="decisions">
    <h3>Decisions Made: {decisions}</h3>
  </div>
  
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    width: 15rem;
    border-radius: 25px;
  }

  h1 {
    font-size: 2rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 50vw;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }

  #statuses {
    display: flex;
    flex-direction: row;
  }

</style>
