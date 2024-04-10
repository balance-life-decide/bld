export async function load({ fetch, params }) {
  let scenarios = [];
  await fetch("/scenarios.json")
    .then((res) => res.json())
    .then((data) => {
      for (const obj of data["scenarios"]) {
        scenarios.push(obj);
      }
    });
  return { scenarios };
}
