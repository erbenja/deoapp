<template>
    <div>
        <AdminHeader/>
        <h1 class="d-flex justify-center">Správa testů</h1>
        <TestTable/>
    </div>
</template>

<script>
    import AdminHeader from "../../../components/layout/AdminHeader";
    import TestTable from "../../../components/tables/TestTable";

    export default {
        name: 'Tests',
        components: {AdminHeader, TestTable},
        data() {
            return {

            }
        }
    }
</script>
