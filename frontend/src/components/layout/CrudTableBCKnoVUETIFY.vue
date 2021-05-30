<template>
    <div>
        <!--        create new item-->
        <router-link v-if="createName !== undefined" :to="{name: createName}">Create New</router-link>
        <table>
            <tr>
                <!--                setup title row-->
                <th>Actions</th>
                <th v-bind:key="field" v-for="field in fields">
                    {{field}}
                </th>
            </tr>

            <!--            populate body cells-->
            <tbody v-bind:key="isGrouped ? group[0].id : group.id" v-for="group in isGrouped ? grouped : data">
                <!--                if group title-->
                <h3 v-if="isGrouped">{{groupProp.type === 'date' ? group[0][groupProp.name].slice(0,10) :
                    group[0][groupProp.name]}}
                </h3>
                <!--                if plain data-->
                <tr v-if="!isGrouped">
                    <td>
                        <div v-on:click="goToEdit(group.id)">Edit</div>
                        <div v-on:click="deleteItem(group.id)">Delete</div>
                        <!--                        <router-link :to="{ name: editPath, params :{id:el.id}}">Edit</router-link>-->
                    </td>
                    <td v-bind:key="field" v-for="field in fields">
                        {{typeof group[field] === "string" ? group[field].slice(0, maxLength) : group[field]}}
                    </td>
                </tr>

                <!--                if grouped data-->
                <tr v-else-if="isGrouped" v-bind:key="el.id" v-for="el in group">
                    <td>
                        <div v-on:click="goToEdit(el.id)">Edit</div>
                        <div v-on:click="deleteItem(el.id)">Delete</div>
                        <!--                        <router-link :to="{ name: editPath, params :{id:el.id}}">Edit</router-link>-->
                    </td>
                    <td v-bind:key="field" v-for="field in fields">
                        {{typeof el[field] === "string" ? el[field].slice(0, maxLength) : el[field]}}
                    </td>

                </tr>
            </tbody>

        </table>
    </div>

    <!--    <tr v-bind:key="el.id" v-for="el in data">-->
    <!--        <td>-->
    <!--            <router-link :to="{ name: editPath, params :{id:el.id}}">Edit</router-link>-->
    <!--        </td>-->
    <!--        <td v-bind:key="field" v-for="field in fields">-->
    <!--            {{typeof el[field] === "string" ? el[field].slice(0, maxLength) : el[field]}}-->
    <!--        </td>-->
    <!--    </tr>-->


</template>

<script>
    import {HTTP} from "@/http-common";

    export default {
        name: 'CrudTable',
        components: {},
        props: ['fields', 'path', 'createName', 'editName', 'remove', 'maxLength', 'sortProp', 'groupProp'],
        data() {
            return {
                data: [],
                // grouped: [],
            }
        },
        created: function () {
            this.getItems();
        },
        computed: {
            grouped: function () {
                const grouped = [];
                if (this.isGrouped) {
                    let value = '';
                    let index = -1;
                    for (let el of this.data) {
                        let elVal = this.getProperty(el, this.groupProp.name);
                        switch (this.groupProp.type) {
                            case 'date':
                                elVal = elVal.slice(0,10);
                                // elVal = elVal.map(a => a.slice(0, 10));
                                break;
                            default:
                                break;
                        }

                        if(elVal === value){
                        // if (value in elVal) {
                            grouped[index].push(el);
                        } else {
                            value = elVal;
                            index++;
                            grouped.push([el]);
                        }
                    }
                }

                return grouped;
            },
            isGrouped: function () {
                // return false;
                return this.groupProp !== undefined;
            },
        },
        methods: {
            getProperty: function (obj, keys) {
                keys = keys.split('.');
                let i = 0;
                // eslint-disable-next-line no-unused-vars
                for (let m; i < keys.length - 1; i++) {
                    // if(Array.isArray(obj)) {
                    //     obj = obj.map(a => this.getProperty(a, keys.slice[i - 1]));
                    // } else {
                        obj = obj[keys[i]];
                    // }
                }

                // obj[keys[i]] = value;

                return obj[keys[i]];
                // return Array.isArray(obj) ? obj : [obj];
            },
            getItems: async function () {
                const res = await HTTP.get(this.path);
                this.data = res.data;

                if (this.sortProp !== undefined) {
                    this.data.sort((a, b) => {
                        return this.getProperty(a, this.sortProp) < this.getProperty(b, this.sortProp)
                    });
                }
            },
            goToEdit: function (id) {
                this.$router.push({name: this.editName, params: {id}});

            },
            deleteItem: async function (id) {
                if (confirm('Do you want to delete?')) {
                    try {
                        await HTTP.delete(`${this.path}/${id}`);
                        await this.getItems();
                    } catch {
                        // console.error(e);
                    }
                } else {
                    // console.log('didnt confirm to delete');

                }
            }
        }
    }
</script>

<style>
</style>
