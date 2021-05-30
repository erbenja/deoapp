<template>
    <div>
        <AdminHeader/>
        <h1 class="d-flex justify-center">Správa ročníků</h1>
        <YearTable/>
    </div>
</template>

<script>
    import AdminHeader from "../../../components/layout/AdminHeader";
    import YearTable from "../../../components/tables/YearTable";

    export default {
        name: 'Years',
        components: {AdminHeader, YearTable},
    }
</script>
