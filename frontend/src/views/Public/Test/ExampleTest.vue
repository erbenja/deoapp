<template>
    <v-container>
        <TestComponent :runType="runType" :id="id"/>
    </v-container>
</template>

<script>
    import TestComponent from "../../../components/test/fillAndTry/TestComponent";

    export default {
        name: 'ExampleTest',
        components: {
            TestComponent,
        },
        data() {
            return {
                runType: 'example',
                id: 1,
            }
        }
    }
</script>
