<script>
  export let text;

</script>

<button on:click>
  {text}
</button>

<style>
  button {
    color: white;
    background-color: #307cf6;
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    border-radius: 2em;
    width: 150px;
    cursor: pointer;
    border: none;
  }

  button:active {
    background-color: #4585ed;
  }
</style>
