<template>
    <v-container>
        <TestComponent :runType="runType" :id="id"/>
    </v-container>
</template>

<script>
    import TestComponent from "../../components/test/fillAndTry/TestComponent";

    export default {
        name: 'ContestantTest',
        components: {TestComponent},
        data() {
            return {
                runType: 'official',
                id: this.$store.getters.testId,
            }
        }
    }
</script>
