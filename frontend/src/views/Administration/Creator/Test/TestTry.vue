<template>
    <div class="post">
        <AdminHeader/>
        <TestComponent :runType="runType" :id="id"/>
    </div>
</template>

<script>
    import TestComponent from "@/components/test/fillAndTry/TestComponent";
    import AdminHeader from "../../../../components/layout/AdminHeader";

    export default {
        name: 'ExampleTest',
        props: {id: Number},
        components: {
            AdminHeader,
            TestComponent,
        },
        data() {
            return {
                runType: 'try',
            }
        },
        created() {
            // console.log(typeof this.$route.params.id);
        },
        methods: {}
    }
</script>
