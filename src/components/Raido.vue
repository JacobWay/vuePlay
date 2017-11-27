<template>
    <div>
        <div v-for="(radio, index) in radios">
            <input :id="'radio' + index" type="radio" :value="radio" v-model="radioValue">
            <label :for="'radio' + index">{{'radio '+ index}}</label>
        </div>
        <span>Picked: {{radioValue}}</span>
    </div>
</template>

<script>
export default {
    name: 'priceCard',
    data() {
        return {
            radioValue: ''
        }
    },
    props: ['radios']
}
</script>

<style scoped>
</style>

