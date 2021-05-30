<template>
    <div>
        <AdminHeader/>
        <h1 class="d-flex justify-center">Správa článků</h1>
        <PostTable/>
    </div>
</template>

<script>
    import AdminHeader from "../../../components/layout/AdminHeader";
    import PostTable from "../../../components/tables/PostTable";

    export default {
        name: 'Posts',
        components: {AdminHeader,PostTable},
    }
</script>
