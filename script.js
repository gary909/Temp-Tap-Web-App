let tapTimes = [];
const bpmDisplay = document.getElementById('bpmDisplay');

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {  // Spacebar key code
        const currentTime = Date.now();
        tapTimes.push(currentTime);
        
        // Limit the number of tap times stored to avoid memory overflow
        if (tapTimes.length > 10) {
            tapTimes.shift();
        }

        if (tapTimes.length > 4) {  // Minimum 4 presses to display BPM
            calculateBPM();
        } else {
            bpmDisplay.textContent = '...';  // Indicate that more presses are needed
        }
    }
};

function calculateBPM() {
    const timeIntervals = tapTimes.slice(1).map((time, index) => time - tapTimes[index]);
    const averageInterval = timeIntervals.reduce((acc, curr) => acc + curr) / timeIntervals.length;
    const bpm = (60000 / averageInterval).toFixed(2); // Calculate BPM and format to 2 decimal places

    bpmDisplay.textContent = bpm;
}
