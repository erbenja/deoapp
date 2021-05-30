<template>
    <div>
        <AdminHeader/>
        <h1 class="d-flex justify-center">Správa hodnocení</h1>
        <EvaluationTable/>
    </div>
</template>

<script>
    import AdminHeader from "../../../components/layout/AdminHeader";
    import EvaluationTable from "../../../components/tables/EvaluationTable";

    export default {
        name: 'Evaluation',
        components: {AdminHeader, EvaluationTable},
    }
</script>
