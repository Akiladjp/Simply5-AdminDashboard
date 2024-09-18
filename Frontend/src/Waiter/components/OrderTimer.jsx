// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useStopwatch } from "react-use-precision-timer";
// import { selectTimerState } from "../../Redux/Slices/OrderTimerSlice";

// const Stopwatch = ({ orderID }) => {
// 	const stopwatch = useStopwatch();
// 	const [time, setTime] = useState(0);
// 	const [savedTime, setSavedTime] = useState(0);
// 	const timerState = useSelector(selectTimerState);
// 	const [timer_id, timer_state] = timerState.split("-");
// 	useEffect(() => {
// 		// Retrieve the saved elapsed time from local storage specific to this order
// 		const storedTime = localStorage.getItem(`stopwatchTime_${orderID}`);
// 		if (storedTime) {
// 			setSavedTime(parseInt(storedTime, 10));
// 		}
// 		if (timerState) {
// 			setTime(0);
// 			startStopwatch();
// 		}
// 	}, [orderID, timerState]);

// 	useEffect(() => {
// 		let interval;
// 		// interval = setInterval(() => {
// 		//   const elapsedTime = stopwatch.getElapsedRunningTime();

// 		//   setTime(elapsedTime + savedTime); // Add saved time to the current elapsed time
// 		//   // localStorage.setItem(`stopwatchTime_${orderID}`, elapsedTime + savedTime); // Save to local storage
// 		// }, 10);
// 		// // Check if the current orderID matches the timer_id in the state
// 		// console.log(orderID,timer_id);
// 		if (orderID == timer_id) {
// 			// If timer_state is true (indicating the stopwatch should run)
// 			if (timer_state == "true") {
// 				stopwatch.start(); // Start the stopwatch
// 				interval = setInterval(() => {
// 					const elapsedTime = stopwatch.getElapsedRunningTime();

// 					setTime(elapsedTime + savedTime); // Add saved time to the current elapsed time
// 					localStorage.setItem(
// 						`stopwatchTime_${orderID}`,
// 						elapsedTime + savedTime
// 					); // Save to local storage
// 				}, 10); // Update every 10 milliseconds
// 			} else if (timer_state == "false") {
// 				// Pause the stopwatch if the timer_state is false
// 				stopwatch.pause();
// 				localStorage.removeItem(`stopwatchTime_${orderID}`); // Optionally clear saved time
// 			}
// 		} else {
// 			// If the orderID doesn't match the timer_id, reset the stopwatch
// 			// stopwatch.reset();
// 			// resetStopwatch()
// 			// setTime(0);
// 			// setSavedTime(0);
// 		}

// 		// Cleanup: clear the interval when the component unmounts or when orderID/timer_state changes
// 		return () => clearInterval(interval);
// 	}, [ orderID, timer_id, timer_state]);

// 	const startStopwatch = () => {
// 		stopwatch.start();
// 	};

// 	const stopStopwatch = () => {
// 		stopwatch.pause();
// 	};

// 	const resetStopwatch = () => {
// 		//	stopwatch.reset();
// 		setTime(0); // Reset the displayed time
// 		setSavedTime(0); // Clear saved time
// 		localStorage.removeItem(`stopwatchTime_${orderID}`); // Clear saved time from local storage
// 	};

// 	const formatTime = (time) => {
// 		const milliseconds = Math.floor(time % 1000);
// 		const seconds = Math.floor((time / 1000) % 60);
// 		const minutes = Math.floor((time / 60000) % 60);
// 		const hours = Math.floor(time / 3600000);

// 		return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
// 			seconds < 10 ? "0" : ""
// 		}${seconds}`;
// 	};

// 	return (
// 		<div>
// 			<h1>Stopwatch</h1>
// 			<div>{formatTime(time)}</div>
// 			<button onClick={startStopwatch}>Start</button>
// 			<button onClick={stopStopwatch}>Stop</button>
// 			<button onClick={resetStopwatch}>Reset</button>
// 		</div>
// 	);
// };

// export default Stopwatch;
