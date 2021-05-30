<template>
    <div>
        <AdminHeader/>
        <h1 class="d-flex justify-center">Správa uživatelů</h1>
        <UserTable/>
    </div>
</template>

<script>
    import AdminHeader from "../../../components/layout/AdminHeader";
    import UserTable from "../../../components/tables/UserTable";

    export default {
        name: 'Users',
        components: {AdminHeader,UserTable},
    }
</script>
