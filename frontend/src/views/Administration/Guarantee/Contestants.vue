<template>
    <div>
        <AdminHeader/>
        <h1 class="d-flex justify-center">Správa účastníků</h1>
        <ContestantGuaranteeTable/>
    </div>
</template>

<script>
    import AdminHeader from "../../../components/layout/AdminHeader";
    import ContestantGuaranteeTable from "../../../components/tables/ContestantGuaranteeTable";

    export default {
        name: 'Contestants',
        components: {AdminHeader, ContestantGuaranteeTable},
    }
</script>
