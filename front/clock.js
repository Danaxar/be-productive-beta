// Wait to load the entire DOM
document.addEventListener("DOMContentLoaded", function () {
  var clockBtn = document.getElementById("clockButton"); // Start/Stop button
  var minutes = document.getElementById("minutes"); // Input minutes
  var seconds = document.querySelector('input[type="number"][name="seconds"]'); // Input seconds
  var intervalo; // Interval object

  // Invert the button function start <-> stop
  const changeBtn = () => {
    if (clockBtn.childNodes[0].data === "Start") {
      clockBtn.childNodes[0].data = "Stop";
      clockBtn.classList.replace("startButton", "stopButton");
    } else {
      clockBtn.childNodes[0].data = "Start";
      clockBtn.classList.replace("stopButton", "startButton");
    }
  };

  // Add event
  clockBtn.addEventListener("click", () => {
    if (clockBtn.childNodes[0].data === "Start") {
      // Interval discounting the clock
      intervalo = setInterval(() => {
        // Finished?
        if (minutes.value == 0 && seconds.value == 0) {
          changeBtn();
          new Audio("./media/mixkit-positive-notification-951.wav").play();
          clearInterval(intervalo);
        }

        // Not finished yet
        else {
          if (seconds.value == 0) {
            minutes.value--;
            seconds.value += 60;
            minutes.value < 10 ? (minutes.value = 0 + minutes.value) : null;
          }
          seconds.value--;
          seconds.value < 10 ? (seconds.value = 0 + seconds.value) : null;
        }
      }, 1000); // Each second

      changeBtn();
    }

    // Stop button is living
    else {
      clearInterval(intervalo); // Stop the clock
      changeBtn(); // Invert the button
    }
  });
});
