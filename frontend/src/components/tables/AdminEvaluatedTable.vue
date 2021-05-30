<template>
    <CrudTable
            :fields="fields"
            :path="path"
            :viewName="viewName"
            :maxLength="maxLength"
            :groupProp="groupProp"
    ></CrudTable>
</template>

<script>
    import CrudTable from "../layout/CrudTable";

    export default {
        name: 'AdminEvaluatedTable',
        components: {CrudTable},
        props: {},
        computed: {},
        data() {
            return {
                fields: [
                    // {text: 'id', value: 'id', groupable: false},
                    {text: 'křestní', value: 'contestant.firstname', groupable: false},
                    {text: 'příjmení', value: 'contestant.surname', groupable: false},
                    {text: 'škola', value: 'contestant.school.name', groupable: true},
                    {text: 'ročník soutěže', value: 'round.year.year', groupable: true},
                    {text: 'kategorie', value: 'contestantCategory', groupable: true},
                    {text: 'získáné body', value: 'receivedPoints',groupable: false},
                    // {text: 'accessCoe', value: 'surname', groupable: false},
                    // {text: 'lastModified', value: 'lastModified', groupable: false}
                ],
                path: 'accesscodes/evaluated',
                // createName: 'ContestantCreate',
                // editName: 'ContestantEdit',
                viewName: 'TestResultView',
                remove: false,
                maxLength: 30,
                sortProp: 'lastModified',
                groupProp: 'round.year.year',
            }
        },
        created: function () {
        },
        methods: {}

    }

</script>

<style>
</style>
