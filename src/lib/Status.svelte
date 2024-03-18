<script>
  export let num;
  export let src;

</script>

<div>
  <img {src} alt="Icon">
  <span>{num}</span>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 5px;
  }

  img {
    width: 75px;
    height: 75px;
  }

</style>
