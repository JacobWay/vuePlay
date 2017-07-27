<template>
  <div class="hello">
      {{message}}
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      message: 'Hello Vue!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
