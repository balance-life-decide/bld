export async function load({ fetch, params }) {
  let scenarios = [];

  await fetch("/scenarios.json")
    .then((res) => res.json())
    .then((data) => {
      for (const obj of data["scenarios"]) {
        scenarios.push(obj);
      }
    });

  let achievements = [];

  await fetch("/achievements.json")
    .then((res) => res.json())
    .then((data) => {
      for (const obj of data["achievements"]) {
        achievements.push(obj);
      }
    });

  return { scenarios, achievements };
}
