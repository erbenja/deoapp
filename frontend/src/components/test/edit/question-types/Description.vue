<template>
    <div class="description">
<!--        <v-card-title>-->
<!--            <h3>type: description</h3>-->
<!--        </v-card-title>-->
<!--        <v-row class="option px-5 justify-space-between" v-on:change="updateOption($event, option.id)"-->
<!--               v-bind:key="option.id"-->
<!--               v-for="option of options">-->
<!--            <v-btn fab x-small class="ma-1 align-self-center" color="red" v-on:click="deleteOption(option.id)">-->
<!--                <v-icon color="white">-->
<!--                    mdi-delete-->
<!--                </v-icon>-->
<!--            </v-btn>-->
<!--            <v-text-field class="mx-4" type="text" name="content" v-model="option.content"-->
<!--                          label="option text"></v-text-field>-->
<!--            <v-checkbox type="checkbox" name="correct" v-model="option.correct" label="is correct"></v-checkbox>-->
<!--        </v-row>-->
    </div>
</template>

<script>
    import {HTTP} from "@/http-common";

    export default {
        name: 'Description',
        props: {},
        data() {
            return {
                // options: this.$attrs.options,
                answers: '',

            }
        },
        created: function () {
            // this.call();
            // console.log(this.options);
        },
        methods: {
            updateOption: async function (e, id) {
                // console.log(e);
                let payload = {};
                payload[e.target.name] = e.target.name === "correct" ? e.target.checked ? 1 : 0 : e.target.value;
                await HTTP.put("questionoptions/" + id, payload);
            },
            deleteOption: async function (id) {
                await HTTP.delete("questionoptions/" + id);
                const index = this.options.map(el => el.id).indexOf(id);
                if (index > -1) {
                    this.options.splice(index, 1);
                }
                // this.options = this.options.filter(el => el.id != id);
            }
        }

    }

</script>

<style>
    /*:root {*/
    /*    font-size: 16px;*/
    /*}*/

    /*.container {*/
    /*    margin: 0 0 2rem 0;*/
    /*    display: flex;*/
    /*    flex-direction: column;*/
    /*    width: auto;*/
    /*    text-align: center;*/
    /*}*/

</style>
