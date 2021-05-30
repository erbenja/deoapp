r<template>
    <CrudTable
            :fields="fields"
            :path="path"
            :editName="editName"
            :maxLength="maxLength"
            :groupProp="groupProp"
            :search-prop="true"
    ></CrudTable>
</template>


<script>
    import CrudTable from "../layout/CrudTable";

    export default {
        name: 'TestTable',
        components: {CrudTable},
        computed: {},
        data() {
            return {
                fields: [
                    // {text: 'id', value: 'id'},
                    {text: 'time limit', value: 'timeLimit', groupable: false},
                    {text: 'year', value: 'round.year.year', groupable: true},
                    {text: 'category', value: 'category.name', groupable: false},
                    {text: 'closed', value: 'closed', class: 'bool', groupable: false}],
                //     ['id', 'title', 'content', 'lastModified'],
                path: 'tests',
                editName: 'TestEdit',
                remove: false,
                groupProp: 'round.year.year',
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
