<template>
<v-container fluid class="fill-height">
    <v-row justify="center" align="center">
        <v-col cols="12" xs="12" sm="12" md="4" v-for="(lamp, id, i) in lights" :key="i">
            <v-card flat elevation="12">
                <v-toolbar color="deep-purple accent-4" dark>
                  <v-icon left>settings_brightness</v-icon>

                    <v-toolbar-title>{{ lamp.name }}</v-toolbar-title>

                    <div class="flex-grow-1"></div>
                </v-toolbar>
                <div class="pa-5">
                    <ul>
                      
                        <li>
                            <v-slider v-model="lamp.state.bri" max="254" min="1" append-icon="keyboard_arrow_up" prepend-icon="keyboard_arrow_down" label="Valot" @change="setBrightness(id, lamp.state.bri)"></v-slider>
                        </li>
                          <li>
                            <v-btn block :color="lamp.state.on ? 'green lighten-2' : 'red lighten-2'" class="white--text" @click="setLight(id, lamp.state.on = !lamp.state.on)" depressed>{{ lamp.state.on ? 'Päällä' : 'Poispäältä' }}</v-btn>
                        </li>
                    </ul>
                </div>

            </v-card>
        </v-col>

    </v-row>
</v-container>
</template>

<script>
import api from '@/services/api'
export default {
    components: {

    },
    data() {
        return {
            lights: []
        }
    },
    methods: {
        setLight(id, on) {
            console.log('id ', id, 'status ', on)
            api.post('/setLight', {
                id,
                on
            }).then((res) => console.log(res))
        },
        setBrightness(id, bri) {
            api.post('/setBrightness', {
                id,
                bri
            }).then((res) => console.log(res))
        }
    },
    mounted() {
        api.get('/lights').then(({
            data
        }) => this.lights = data)
    },
};
</script>
<style>
    ul {
      list-style: none;
    }
</style>