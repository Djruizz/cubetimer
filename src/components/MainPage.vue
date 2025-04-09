<template>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cube Timer</title>
    </head>
    <body>
        <NavbarComponent @themeChanged = "updateTheme"></NavbarComponent>
        <div class="container-fluid">
            <div class="row p-2">
                <div class="col-3" id="sidebar">
                    <SettingsTab @cubeTypeSelected="updateCubeType"></SettingsTab>
                    <TimeRegisterTab :registerTime="newTime"></TimeRegisterTab>
                </div>
                <div class="col-9" id="mainContent">
                    <ScrambleDisplayTab ref="ScrambleDisplayTab" :cubeType="selectedCubeType"></ScrambleDisplayTab>
                    <TimerDisplayTab @timeElapsed="registerNewTime" @newAlgorithm="getNewAlgorithm"></TimerDisplayTab>
                </div>

            </div>
        </div>
    </body>
    </html>
</template>
<script>
import NavbarComponent from './Sections/Navbar.vue'
import SettingsTab from './Sections/SideBar/SettingsTab.vue';
import TimeRegisterTab from './Sections/SideBar/TimeRegisterTab.vue';
import ScrambleDisplayTab from './Sections/MainContent/ScrambleDisplayTab.vue';
import TimerDisplayTab from './Sections/MainContent/TimerDisplayTab.vue';

import {GlobalState} from '@/data/GlobalData.js'
import {CubeTypes} from '@/data/GlobalData.js'
export default {
    name: 'MainPage',
    components: {
        NavbarComponent,
        SettingsTab,
        TimeRegisterTab,
        ScrambleDisplayTab,
        TimerDisplayTab,
    },
    data() {
        return {
            isDarkTheme: GlobalState.isDarkTheme,
            selectedCubeType: CubeTypes[1],
            newTime: [0, false],
            timeData:{},
        };
    },
    methods: {
       updateTheme(theme){
        GlobalState.isDarkTheme = theme === 'dark';
        document.body.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
       },

       updateCubeType(cubeType){
        this.selectedCubeType = cubeType
       },

       registerNewTime(time, saveTime){
        this.newTime[0] = time;
        this.newTime[1] = saveTime;
       },
       getNewAlgorithm(){
        this.$refs.ScrambleDisplayTab.nextScramble(this.selectedCubeType.id);
       }
    },
    mounted() {
        //Updates theme at start
        document.body.setAttribute('data-bs-theme', this.isDarkTheme ? 'dark' : 'light');
        
    },
};
</script>

<style>
body{
    height: 100vh;
}
</style>