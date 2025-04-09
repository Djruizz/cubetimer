<template>
    <div class="bg-light-subtle p-3 my-2 rounded-3 shadow-sm" >
        <div class=" justify-content-center align-items-center">
                        
            <div class="row">
                <div class="col text-center" @themeChanged="updateTheme">
                    <h5>Scramble</h5>
                    <button id="lastScrambleButton" class="btn btn-outline-danger mx-2" @click="getLastScramble">Last</button>
                    
                    <button id="nextScrambleButton" class="btn btn-outline-success mx-2" @click="nextScramble(cubeType.id)">Next</button>
                    
                </div>
                
            </div>

            <div class="row pt-2">
                <div class="col text-center">
                    <h2 id="scrambleDisplay" class="m-0">{{this.showedScramble.join(" ")}}</h2>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import {AllMoves} from '@/data/GlobalData.js'
    export default {
        name: 'ScrambleDisplayTab',
        data() {
            return {
                scramble: [],
                lastScramble: [],
                scrambleBeforeLast: null, // Stores the scramble before "Last" button was pressed
                scrambleSizes: {
                    0: 10, // 2x2
                    1: 20, // 3x3
                    2: 30, // 4x4
                    3: 30, // 5x5
                    4: 11, // Skewb
                    5: 11, // Pyraminx
                    6: 30  // Megaminx
                },
                AllMoves,
                showedScramble: [],
            };
        },
        props: {
            cubeType: {
                type: Object,
                required: true
            }
        },
        methods: {
            nextScramble(cubeId) {
                if (this.scrambleBeforeLast) {
                    // Restore the scramble before "Last" button was pressed
                    this.showedScramble = [...this.scrambleBeforeLast];
                    this.scrambleBeforeLast = null; // Clear the temporary storage
                    return;
                }

                // Save the current scramble to lastScramble before generating a new one
                if (this.scramble.length > 0) {
                    this.lastScramble = [...this.scramble];
                }

                const scrambleLength = this.scrambleSizes[cubeId] || 20;
                this.scramble = [];
                let lastMoveType = null;

                const moves = AllMoves[cubeId];

                for (let i = 0; i < scrambleLength; i++) {
                    let randomMove;
                    let randomIndex;

                    do {
                        randomIndex = Math.floor(Math.random() * moves.length);
                        randomMove = moves[randomIndex];
                    } while (randomMove[0] === lastMoveType); // Avoid repeating move type (e.g., "U" followed by "U'")

                    this.scramble.push(randomMove);
                    lastMoveType = randomMove[0]; // Save only the move type
                }

                this.showedScramble = [...this.scramble];
            },
            getLastScramble() {
                if (this.lastScramble.length > 0) {
                    // Save the current scramble to scrambleBeforeLast before showing the last scramble
                    this.scrambleBeforeLast = [...this.showedScramble];
                    this.showedScramble = [...this.lastScramble];
                } else {
                    alert("No previous scramble available.");
                }
            }
        },
        mounted() {
            this.nextScramble(1);
        },
    }
</script>