<template>
    <header>
        <nav class="navbar bg-dark-subtle">
            <div class="container-fluid">
                <div class="navbar-brand d-flex align-items-center">    
                    <img src="/images/CubeIcon.png" alt="" width="50" height="50" class="d-inline-block align-text-center mx-2">
                    <h1 class="text-center mx-2 mb-0">Cube Timer</h1>
                </div>
                <div class="nav-item">

                    <button class="btn" id="toggleThemeButton" type="button" data-bs-toggle="button" @click="toggleTheme()" aria-pressed="false" autocomplete="off" aria-label="Toggle dark mode"> 
                        <!-- <span class="" id="moonIcon"><i data-feather='moon' class=""></i></span>
                        <span class="d-none" id="sunIcon"><i data-feather='sun' class=""></i></span> -->
                        <span v-if="!this.isDarkTheme" id="moonIcon">Moon</span>
                        <span v-if="this.isDarkTheme" id="sunIcon">Sun</span>
                    </button>
                </div>
            </div>
        </nav>
        
    </header>
</template>
<script>

import {GlobalState} from '@/data/GlobalData.js'
export default{
    
    name: 'NavbarComponent',
    data() {
        return {
            isDarkTheme: GlobalState.isDarkTheme, 
        };
    },
    methods:{
        toggleTheme() {
            this.isDarkTheme = !this.isDarkTheme;
            this.$emit('themeChanged', this.isDarkTheme ? 'dark' : 'light');
            localStorage.setItem('theme', this.isDarkTheme);
            console.log(this.isDarkTheme);
        }
    },
    mounted(){
        
    }
}
</script>