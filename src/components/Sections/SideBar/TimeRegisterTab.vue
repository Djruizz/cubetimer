<template>
    <div class="bg-light-subtle p-3 my-2 rounded-3 shadow-sm" id="timeRegisterTab">
        <div class="row p-0">
            <div class="col mt-1">
                <h4>Times</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Current</th>
                            <th scope="col">Best</th>
                        </tr>
                    </thead>
                    <tbody id="timesTableBody">
                        <!-- Averages will be dynamically added here -->
                        <tr>
                            <th scope="row">Time</th>
                            <td id="currentSolveCell">
                                {{ TimeData.TimeRegister[TimeData.TimeRegister.length - 1] || "-" }}
                            </td> <!-- Display the latest time -->
                            <td id="bestSolveCell" class="text-success">
                                {{ TimeData.TimeRegister[TimeData.millisTimeRegister.indexOf(Math.min(...TimeData.millisTimeRegister))] || "-" }}
                            </td> <!-- Display the best time -->
                        </tr>
                        <tr>
                            <th scope="row">Ao5</th>
                            <td id="currentAo5Cell">
                                {{ TimeData.Ao5Register[TimeData.Ao5Register.length - 1] || "-" }}
                            </td> <!-- Display the latest Ao5 -->
                            <td id="bestAo5Cell" class="text-success">
                                {{ TimeData.Ao5Register[TimeData.Ao5millisRegister.indexOf(Math.min(...TimeData.Ao5millisRegister))] || "-" }}
                            </td> <!-- Display the best Ao5 -->
                        </tr>
                        <tr>
                            <th scope="row">Ao12</th>
                            <td id="currentAo12Cell">
                                {{ TimeData.Ao12Register[TimeData.Ao12Register.length - 1] || "-" }}
                            </td> <!-- Display the latest Ao12 -->
                            <td id="bestAo12Cell" class="text-success">
                                {{ TimeData.Ao12Register[TimeData.Ao12millisRegister.indexOf(Math.min(...TimeData.Ao12millisRegister))] || "-" }}
                            </td> <!-- Display the best Ao12 -->
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>

        <div class="row p-0">
            <div class="col">
                <h4>Solves</h4>
                <div class="overflow-auto" style="height: 40vh;">
                    <table class="table table-striped " id="solvesTable" >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Time</th>
                                <th scope="col">Ao5</th>
                                <th scope="col">Ao12</th>
                            </tr>
                        </thead>
                        <tbody id="solvesTableBody">
                            <!-- Mostrar los elementos en orden descendente -->
                            <tr v-for="(solve, index) in TimeData.TimeRegister.slice().reverse()" :key="index">
                                <th>{{ TimeData.TimeRegister.length - index }}</th> <!-- Ajustar el índice para reflejar el orden original -->
                                <td :class="{'text-success': TimeData.bestSolves.includes(TimeData.millisTimeRegister.slice().reverse()[index])}">
                                    {{ solve }}
                                </td>
                                <td :class="{'text-success': TimeData.bestAo5.includes(TimeData.Ao5millisRegister.slice().reverse()[index])}">
                                    {{ TimeData.Ao5Register[TimeData.TimeRegister.length - index - 5] || '-' }}
                                </td> <!-- Mostrar Ao5 si está disponible -->
                                <td :class="{'text-success': TimeData.bestAo12.includes(TimeData.Ao12millisRegister.slice().reverse()[index])}">
                                    {{ TimeData.Ao12Register[TimeData.TimeRegister.length - index - 12] || '-' }}
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'TimeRegisterTab',
    data() {
        return {
            TimeData: {
                TimeRegister: [], // Array to hold time data
                bestSolves: [], // Array to hold best solves
                millisTimeRegister: [], // Array to hold time data in milliseconds

                Ao5Register: [], // Array to hold Ao5 data
                bestAo5: [], // Array to hold best Ao5 data
                Ao5millisRegister: [], // Array to hold Ao5 data in milliseconds

                Ao12Register: [], // Array to hold Ao12 data
                bestAo12: [], // Array to hold best Ao12 data
                Ao12millisRegister: [], // Array to hold Ao12 data in milliseconds
            },
        };
    },
    props: {
        registerTime: {
            type: Array,
            required: false
        }

    },
    methods: {
        saveNewTime(time) {
            // Add the new time to the array in milliseconds
            this.TimeData.millisTimeRegister.push(time);

            // Use convertToTime to format the time
            const { minutes, seconds, milliseconds } = this.convertToTime(time);

            // Conditionally format the time string
            if (minutes > 0) {
                this.TimeData.TimeRegister.push(`${minutes}:${seconds}.${milliseconds}`);
            } else {
                this.TimeData.TimeRegister.push(`${seconds}.${milliseconds}`);
            }

            // Update the best solves array
            if (this.TimeData.bestSolves.length === 0 || time < Math.min(...this.TimeData.bestSolves)) {
                this.TimeData.bestSolves.push(time);
            }

            // Trigger Ao5 calculation if there are at least 5 times
            if (this.TimeData.TimeRegister.length >= 5) {
                this.saveAo5();
            }

            // Trigger Ao12 calculation if there are at least 12 times
            if (this.TimeData.TimeRegister.length >= 12) {
                this.saveAo12();
            }
        },
        saveAo5() {
            const lastFiveTimes = this.TimeData.millisTimeRegister.slice(-5); // Get the last 5 times
            const sortedTimes = [...lastFiveTimes].sort((a, b) => a - b); // Sort the times in ascending order
            const filteredTimes = sortedTimes.slice(1, 4); // Remove the lowest and highest times
            const sum = filteredTimes.reduce((acc, time) => acc + time, 0); // Calculate the sum of the remaining 3 times
            const average = sum / 3; // Calculate the average
            this.TimeData.Ao5millisRegister.push(average); // Add the Ao5 to the array

            const { minutes, seconds, milliseconds } = this.convertToTime(average);

            if (minutes > 0) {
                this.TimeData.Ao5Register.push(`${minutes}:${seconds}.${milliseconds}`);
            } else {
                this.TimeData.Ao5Register.push(`${seconds}.${milliseconds}`);
            }

            if (this.TimeData.bestAo5.length === 0 || average < Math.min(...this.TimeData.bestAo5)) {
                this.TimeData.bestAo5.push(average);
            }
        },
        saveAo12() {
            const lastTwelveTimes = this.TimeData.millisTimeRegister.slice(-12); // Get the last 12 times
            const sortedTimes = [...lastTwelveTimes].sort((a, b) => a - b); // Sort the times in ascending order
            const filteredTimes = sortedTimes.slice(1, 11); // Remove the lowest and highest times
            const sum = filteredTimes.reduce((acc, time) => acc + time, 0); // Calculate the sum of the remaining 10 times
            const average = sum / 10; // Calculate the average
            this.TimeData.Ao12millisRegister.push(average); // Add the Ao12 to the array

            const { minutes, seconds, milliseconds } = this.convertToTime(average);

            if (minutes > 0) {
                this.TimeData.Ao12Register.push(`${minutes}:${seconds}.${milliseconds}`);
            } else {
                this.TimeData.Ao12Register.push(`${seconds}.${milliseconds}`);
            }

            if (this.TimeData.bestAo12.length === 0 || average < Math.min(...this.TimeData.bestAo12)) {
                this.TimeData.bestAo12.push(average);
            }
        },
        convertToTime(time){
            const totalSeconds = Math.floor(time / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = String(totalSeconds % 60).padStart(2, "0");
            const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
            return { minutes, seconds, milliseconds }; // Return the formatted time
        },
        
    },
    mounted() {
        // Code to run when the component is mounted
    },
    watch: {
        registerTime: {
            deep: true, // Ensure deep watching for array changes
            handler(newVal) {
                if (newVal[1]) {
                    this.saveNewTime(newVal[0]); // Call the saveNewTime method with the new time
                }
            }
        }
    },
};
</script>