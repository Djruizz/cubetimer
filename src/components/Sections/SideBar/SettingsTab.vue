<template>
    <div class="bg-light-subtle p-3 my-2 rounded-3 shadow-sm" id="settingsTab">
        <h3>Settings</h3>
        <div class="row">
            <button class="btn dropdown-toggle" type="button" id="cubeTypeDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Scramble Type: <strong>{{ selectedCubeType.name }}</strong>
                <ul class="dropdown-menu" aria-labelledby="cubeTypeDropdown">
                    <li v-for="(cubeType, index) in CubeTypes" :key="index">
                        <a href="" class="dropdown-item" @click.prevent="selectCubeType(cubeType)"
                        :class="{ 'active': selectedCubeType === cubeType ,'disabled': disabledCubeTypes.includes(cubeType) }">
                        {{cubeType.name}}</a>
                    </li>
                </ul>
            </button>
        </div>
    </div>
    
</template>
<script>
import { CubeTypes } from '@/data/GlobalData.js';

export default {
    
    name: 'SettingsTab',
    data() {
        return {
            CubeTypes,
            selectedCubeType: CubeTypes[1], // Default to the first cube type
            disabledCubeTypes: [CubeTypes[6],CubeTypes[7]], // Array to hold disabled cube types
        };
    },
    methods: {
        selectCubeType(cubeType) {
            // Handle the selection of a cube type
            this.selectedCubeType = cubeType;
            this.$emit('cubeTypeSelected', cubeType); // Emit an event to notify the parent component
        },
    },
    mounted() {
        
    },
};
</script>