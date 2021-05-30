<template>
    <CrudTable
            :fields="fields"
            :path="path"
            :createName="createName"
            :viewName="viewName"
            :remove="remove"
            :maxLength="maxLength"
            :groupProp="groupProp"
    ></CrudTable>
</template>

<script>
    import CrudTable from "../layout/CrudTable";

    export default {
        name: 'ContestantGuaranteeTable',
        components: {CrudTable},
        props: {},
        computed: {},
        data() {
            return {
                fields: [
                    // {text: 'id', value: 'id', groupable: false},
                    {text: 'křestní', value: 'firstname', groupable: false},
                    {text: 'příjmení', value: 'surname', groupable: false},
                    {text: 'škola', value: 'school.name', groupable: true},
                    {text: 'okres', value: 'school.district.name', groupable: true},
                    {text: 'kraj', value: 'school.district.region.name', groupable: true},
                    // {text: 'accessCoe', value: 'surname', groupable: false},
                    // {text: 'lastModified', value: 'lastModified', groupable: false}
                ],
                path: 'guarantees/contestants',
                createName: 'ContestantCreate',
                editName: 'ContestantEdit',
                viewName: 'ContestantView',
                remove: false,
                maxLength: 30,
                sortProp: 'lastModified',
                groupProp: 'school.name',
            }
        },
        created: function () {
        },
        methods: {}

    }

</script>

<style>
</style>
