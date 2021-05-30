<template>
    <div>
        <AdminHeader/>
        <h1 class="d-flex justify-center">Správa ohodnocených protokolů</h1>
        <AdminEvaluatedTable/>
    </div>
</template>

<script>
    import AdminHeader from "../../../components/layout/AdminHeader";
    import AdminEvaluatedTable from "../../../components/tables/AdminEvaluatedTable";

    export default {
        name: 'Results',
        components: {AdminHeader, AdminEvaluatedTable},
    }
</script>
