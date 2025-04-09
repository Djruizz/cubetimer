<template>
    <div class="bg-light-subtle p-3 my-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center" style="height: 70vh;">
        <div class="text-center row">
            <h1 id="timerDisplay" class="my-auto" :class="{'text-success': this.isTimerReady, 'text-danger': !this.isTimerReady && this.spacePressed}" style="font-size: 70px;">{{ this.timerDisplay }}</h1>
            <h3 id="timerStatus" class="mt-4" >{{ isRunning ? "Running" : isTimerReady ? "Ready" : "Hold Spacebar" }}</h3>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timer: null,
            startTime: null,
            elapsedTime: 0,
            isRunning: false,
            timerDisplay: "00:00.00",
            isTimerReady: false,
            spacePressed: false,
            holdTimeout: null, // Timeout reference for holding the spacebar

            saveTime: false,
        };
    },
    
    methods: {
        startTimer() {
            if (!this.isRunning) {
                this.startTime = Date.now() - this.elapsedTime;
                this.timer = setInterval(() => {
                    this.elapsedTime = Date.now() - this.startTime;
                    this.updateDisplay();
                }, 10);
                this.isRunning = true;
            }
        },
        stopTimer() {
            if (this.isRunning) {
                this.saveTime = true
                this.$emit("timeElapsed", this.elapsedTime, this.saveTime); // Emit the elapsed time to the parent component
                this.$emit("newAlgorithm"); // Emit the new scramble to the parent component
                clearInterval(this.timer);
                this.isRunning = false;
                this.saveTime = false;
            }
        },
        resetTimer() {
            clearInterval(this.timer);
            this.elapsedTime = 0;
            this.updateDisplay();
            this.isRunning = false;
        },
        updateDisplay() {
            const totalSeconds = Math.floor(this.elapsedTime / 1000);
            const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
            const seconds = String(totalSeconds % 60).padStart(2, "0");
            const milliseconds = String(Math.floor((this.elapsedTime % 1000) / 10)).padStart(2, "0");
            this.timerDisplay = `${minutes}:${seconds}.${milliseconds}`;
        },
        handleKeydown(event) {
            if (event.code === "Space" && !this.spacePressed) {
                this.spacePressed = true;
                this.isTimerReady = false;
                if (this.isRunning) {
                    this.stopTimer(); // Stop the timer if it's running
                }
                // Start a timeout to check if the spacebar is held for 0.5 seconds
                this.holdTimeout = setTimeout(() => {
                    if (this.spacePressed && !this.isRunning) {
                        this.isTimerReady = true; // Timer is ready to start
                    }
                }, 500);
                
            }
        },
        handleKeyup(event) {
            if (event.code === "Space") {
                clearTimeout(this.holdTimeout); // Clear the timeout when the spacebar is released

                if (this.isTimerReady) {
                    this.isTimerReady = false;
                    this.resetTimer(); // Reset the timer before starting
                    this.startTimer(); // Start the timer
                }

                this.spacePressed = false; // Reset the spacePressed flag
            }
        },
    },
    mounted() {
        // Add event listeners for keydown and keyup
        window.addEventListener("keydown", this.handleKeydown);
        window.addEventListener("keyup", this.handleKeyup);
    },
    beforeUnmount() {
        // Remove event listeners to avoid memory leaks
        window.removeEventListener("keydown", this.handleKeydown);
        window.removeEventListener("keyup", this.handleKeyup);
    },
};
</script>