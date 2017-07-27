<template>
    <div class="">
        <ul class="card-ul">
            <li class="card-li">
                <div>Title</div>
                <div>1234</div>
            </li>
            <li class="card-li">
                <div>Title</div>
                <div>1234</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'priceCard',
    data() {
        return {
            message: 'price card'
        }
    }
}
</script>

<style scoped>
.card-ul {
    padding: 0px;
}
.card-li {
    display: inline-block;
}
</style>
