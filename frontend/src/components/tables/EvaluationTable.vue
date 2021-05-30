<template>
    <CrudTable
            :fields="fields"
            :path="path"
            :editName="editName"
            :remove="remove"
            :maxLength="maxLength"
    ></CrudTable>
</template>


<script>
    import CrudTable from "../layout/CrudTable";

    export default {
        name: 'EvaluationTable',
        props: {},
        components: {CrudTable},
        computed: {},
        data() {
            return {
                fields: [
                    // {text: 'id', value: 'id', groupable: false},
                    {text: 'datum vyplnění', value: 'testStart', groupable: false}],
                path: 'accessCodes/evaluations',
                editName: 'TestEvaluation',
                remove: false,
                maxLength: 15,
            }
        },
        created: function () {
        },
        methods: {}

    }

</script>

<style>
</style>
