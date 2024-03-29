<script>
  import Button from './lib/Button.svelte';
  import Status from './lib/Status.svelte';

  // list of scenarios
  let scenarios = [];
  let pastScenarios = [];

  let currentScenario = {};

  // status numbers
  let physical = 10;
  let mental = 10;
  let career = 10;
  let education = 10;

  let multiplier = 1;

  // initial scenario info
  let name = "";
  let src = "";
  let caption = "";
  let dilemna = "";

  // number of decisions taken
  let decisions = 0;

  async function loadScenarios() {
    await fetch("./scenarios.json").then((res) => res.json()).then((data) => {
      for (const obj of data["scenarios"]) {
        scenarios.push(obj);
      }
    })

    generateNewScenario();
  }

  function generateNewScenario() {

    // TODO: use math with the current statuses to weigh the randomness
    // for now, it just picks the events in order
    let random = 0;

    // pick out new scenario and remove it from scenarios array
    currentScenario = scenarios.splice(random, 1)[0];

    // set the GUI
    name = currentScenario["name"];
    src = currentScenario["img-url"];
    caption = currentScenario["caption"];
    dilemna = currentScenario["dilemna"];
  }

  /**
   * @param {boolean} decision
   */
  function makeDecision(decision) {

    // if you choose no, the values are negated before adding
    let modifier = (decision ? 1 : -1) * multiplier;

    physical += modifier * currentScenario["physical-modifier"];
    mental += modifier * currentScenario["mental-modifier"];
    education += modifier * currentScenario["education-modifier"];
    career += modifier * currentScenario["career-modifier"];

    decisions++;

    pastScenarios.push(currentScenario);

    generateNewScenario();
}

loadScenarios();

</script>

<main>

  <div id="statuses">
    <Status num={physical} src="/src/assets/Physical Health.jpg" />
    <Status num={mental} src="/src/assets/Mental Health.jpg" />
    <Status num={education} src="/src/assets/Education.jpg" />
    <Status num={career} src="/src/assets/Career.jpg" />
  </div>

  <h1>{name}</h1>

  <div id="scenario-art">
    <img {src} alt="{name}" />
  </div>

  <div id="scenario-caption">
    <p>{caption}</p>
    <p><strong>{dilemna}</strong></p>
  </div>

  <div id="buttons">
    <Button text="Yes" on:click={() => makeDecision(true)}/>
    <Button text="No" on:click={() => makeDecision(false)}/>
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
    margin: 2rem auto;
  }

  p {
    max-width: 60%;
    margin: 1rem auto;
    line-height: 1.35;
  }

  #statuses {
    display: flex;
    flex-direction: row;
  }

</style>
