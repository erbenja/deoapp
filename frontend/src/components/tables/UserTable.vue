<template>
    <CrudTable
            :fields="fields"
            :path="path"
            :createName="createName"
            :editName="editName"
            :maxLength="maxLength"
            :searchProp="searchProp"
    ></CrudTable>
</template>


<script>
    import CrudTable from "../layout/CrudTable";

    export default {
        name: 'UserTable',
        props: {},
        components: {CrudTable},
        computed: {},
        data() {
            return {
                fields: [
                    // {text: 'id', value: 'id', groupable: false},
                    {text: 'firstname', value: 'firstname', groupable: false},
                    {text: 'surname', value: 'surname', groupable: false},
                    {text: 'email', value: 'email', groupable: false},
                    {text: 'admin', value: 'admin', groupable: false, sortable: false},
                    {text: 'guarantee', value: 'guarantee', groupable: false, sortable: false},
                    {text: 'creator', value: 'creator', groupable: false, sortable: false},
                    {text: 'evaluator', value: 'evaluator', groupable: false, sortable: false},
                ],
                path: 'accounts',
                createName: 'UserCreate',
                editName: 'UserEdit',
                searchProp: 'email',
                remove: false,
                maxLength: 15,
            }
        },
        created: function () {        },
        methods: {}

    }

</script>

<style>
</style>
