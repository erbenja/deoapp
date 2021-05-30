<template>
    <div>
        <h1>{{text}}</h1>
        <h2>{{slicedText}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Component',
        components: {},
        props: [],
        data() {
            return {
                text: 'Hello World'
            }
        },
        created: function () {
        this.$store.dispatch('popMessage', {
                text: 'Komponenta byla vytvořena',
                color: 'success'
            });
        },
        computed: {
            slicedText: function () {
                return this.text.slice(0, 5);
            }
        },
        methods: {}

    }
</script>

<style>
</style>
