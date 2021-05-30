<template>
    <CrudTable
            :fields="fields"
            :path="path"
            :createName="createName"
            :editName="editName"
            :remove="remove"
            :maxLength="maxLength"
            :sortProp="sortProp"
            :search-prop="true"
    ></CrudTable>
</template>


<script>
    import CrudTable from "../layout/CrudTable";

    export default {
        name: 'YearTable',
        components: {CrudTable},
        props: {},
        computed: {},
        data() {
            return {
                fields: [
                    // {text: 'id', value: 'id'},
                    {text: 'year', value: 'year', groupable: false},
                    {text: 'description', value: 'description', groupable: false},
                    {text: 'open to public', value: 'openToPublic', groupable: false},
                    {text: 'registrationDeadline', value: 'registrationDeadline', groupable: false}
                ],
                path: 'olympiadyears',
                createName: 'YearCreate',
                editName: 'YearEdit',
                remove: false,
                maxLength: 30,
                sortProp: 'year',
                groupProp: {name: 'year', type: 'number'},
            }
        },
        created: function () {
        },
        methods: {}

    }

</script>

<style>
</style>
