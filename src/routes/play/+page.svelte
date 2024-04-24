<script>
  import Button from '$lib/Button.svelte';
  import Status from '$lib/Status.svelte';

  export let data;

  // list of scenarios
  let { scenarios } = data;
  let { achievements } = data;
  
  let pastScenarios = [];
  let pastAchievements = [];

  let currentScenario = {};

  // status numbers
  let statuses = {
    physical: 10,
    mental: 10,
    career: 10,
    education: 10,
  }

  let multiplier = 1;

  // initial scenario info
  let name = "";
  let src = "";
  let caption = "";
  let dilemna = "";

  // number of decisions taken
  let decisions = 0;

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

    statuses['physical'] += modifier * currentScenario["physical-modifier"];
    statuses['mental'] += modifier * currentScenario["mental-modifier"];
    statuses['education'] += modifier * currentScenario["education-modifier"];
    statuses['career'] += modifier * currentScenario["career-modifier"];

    decisions++;

    currentScenario['choice'] = decision;
    pastScenarios.push(currentScenario);

    checkAchievements();
    generateNewScenario();
}

generateNewScenario();

function checkAchievements() {
  // for each achievement
  outer:
  for (let i in achievements) {
    let achievement = achievements[i];

    // skip if already achieved
    if (pastAchievements.filter((oldAchievement) => oldAchievement['name'] === achievement['name']).length === 1)
      continue;

    // check each requirement for that achievement
    for (let j in achievement['requires']) {
      let requirement = achievement['requires'][j];
      
      switch (requirement['type']) {
        case 'status':

          let target = requirement['number'];
          let current = statuses[requirement['status']];

          switch (requirement['operator']) {
            case '<':
              if (!(target < current)) continue outer;
              break;
            case '>':
              if (!(target > current)) continue outer;
              break;
            case '=':
              if (target !== current) continue outer;
              break;
          }
          break;

        case 'choice':
          for (let k in pastScenarios) {

            let past = pastScenarios[k];

            if (requirement['scenario-name'] === past['name'] && !requirement['choice'] === past['choice'])
              continue outer;
          }
          break;
      }
    }
    // all requirements passed, grant the achievement!
    grantAchievement(achievement);
  }
}

function grantAchievement(achievement) {
  alert("You got the " + achievement['name'] + " achievement!");
  pastAchievements.push(achievement);
}

</script>

<main>

  <div id="statuses">
    <Status num={statuses['physical']} src="/physicalhealth.png" />
    <Status num={statuses['mental']} src="/mentalhealth.png" />
    <Status num={statuses['education']} src="/education.png" />
    <Status num={statuses['career']} src="/career.png" />
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
    <Button text="Yes" on:click={() => makeDecision(true)} />
    <Button text="No" on:click={() => makeDecision(false)} />
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

  #scenario-caption {
    width: 50%;
  }

</style>
