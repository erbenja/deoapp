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
        name: 'PostTable',
        components: {CrudTable},
        props: {},
        computed: {},
        data() {
            return {
                fields: [
                    // {text: 'id', value: 'id', groupable: false},
                    {text: 'nadpis', value: 'title', groupable: false},
                    {text: 'obsah', value: 'content', groupable: false},
                    {text: 'poslední úpravy', value: 'lastModified', groupable: false}],
                //     ['id', 'title', 'content', 'lastModified'],
                path: 'posts',
                createName: 'PostCreate',
                editName: 'PostEdit',
                remove: false,
                maxLength: 30,
                sortProp: 'lastModified',
                groupProp: {name: 'lastModified', type: 'date'},
            }
        },
        created: function () {
        },
        methods: {}
    }

</script>

<style>
</style>
