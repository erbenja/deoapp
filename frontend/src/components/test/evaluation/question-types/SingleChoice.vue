<template>
    <div>
        <v-card-title>
            <h2>Odpověď</h2>
            <h4>typ: {{$typeToCzech['singleChoice']}}</h4>
        </v-card-title>

        <v-simple-table
        >
            <!--            :dense="dense"-->
            <!--            :fixed-header="fixedHeader"-->
            <!--            :height="height"-->
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">Text možnosti</th>
                    <th class="text-left">Zodpovězeno</th>
                    <th class="text-left">Správná odpověď</th>
                </tr>
                </thead>
                <tbody>
                <tr :key="option.id"
                    v-for="option of answer.question.options">
                    <td>{{option.content}}</td>
                    <td>
                        <v-icon>
                            {{answer.answer.id === option.id ? correctIcon : incorrectIcon}}
                        </v-icon>
                    </td>
                    <td>
                        <v-icon>
                            {{ option.correct === 1 ? correctIcon : incorrectIcon}}
                        </v-icon>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>


<script>

    export default {
        name: 'SingleChoice',
        props: {answer: {required: true}},
        data() {
            return {
                correctIcon: 'mdi-check-box-outline',
                incorrectIcon: 'mdi-checkbox-blank-outline'
            }
        },
        created: function () {
        },
        methods: {}

    }

</script>

<style>
</style>
