import WidgetDial from "ui/dial";
import EnvelopeGraph from "ui/graph";
import Keyboard from "ui/keyboard";
import Multislider from "ui/multislider";
import Dropmenu from "ui/dropmenu";
import Slider from "ui/slider";
import Meter from "ui/meter";
import Numberbox from "ui/numberbox";

// Add toggles to open detail views
let detailsToggles = document.getElementsByClassName("details-toggle");
for (let i = 0; i < detailsToggles.length; i++) {
    
    let toggle = detailsToggles[i];
    
    let detailsContainer = toggle.parentNode.getElementsByClassName("details")[0];

    toggle.addEventListener("mouseup", toggleDetails);
    toggle.addEventListener("touchend", toggleDetails);

    function toggleDetails() {
        detailsContainer.classList.toggle("opened");
    }
}

/** Dial */
let dialContainer = document.getElementById("dial");
let dialDisplay = dialContainer.nextElementSibling;
let dial = new WidgetDial(dialContainer);
dial.addObserver((state) => {
    dialDisplay.innerHTML = state;
});
dial.setVal(300);

/** Graph */
let envelopeGraphContainer = document.getElementById("graph");
let envelopeGraphDisplay = document.getElementById("graph-display");
let envelopeGraph = new EnvelopeGraph(envelopeGraphContainer);
envelopeGraph.addObserver(function (state) {
    envelopeGraphDisplay.innerHTML = state.map((xyPair) => " [" + xyPair[0].toFixed(1) + ", " + xyPair[1].toFixed(1) + "]");
});
envelopeGraph.setVal([[0.0, 0.0], [5.3, 65.9], [10.7, 37.3], [16.5, 26.5], [26.0, 37.9], [35.8, 17.2],
[45.3, 69.2], [49.8, 53.9], [53.3, 27.2], [61.3, 15.9], [69.3, 25.9], [74.7, 39.9], [79.5, 47.9],
[83.2, 33.9], [86.2, 25.9], [91.0, 19.2], [92.0, 28.5], [93.0, 44.5], [97.3, 81.9], [100.0, 0.0]]
);

/** Keyboard */
let keyboardContainer = document.getElementById("keyboard");
let keyboardDisplay = document.getElementById("keyboard-display");
keyboardContainer.style.backgroundColor = "red";
let keyboard = new Keyboard(keyboardContainer, {
    bottomNote: 36,
    topNote: 83
});
keyboard.addObserver(function (note) {
    keyboardDisplay.innerHTML = "Pitch: " + note.pitch + " Vel: " + note.vel + "<br>" +
        "Active Notes: " + keyboard.getActiveNotes().map(an => "[ " + an[0] + ", " + an[1] + " ]");
});
keyboard.setVal({ pitch: 60, vel: 100 });
keyboard.setVal({ pitch: 64, vel: 100 });
keyboard.setVal({ pitch: 67, vel: 100 });


/** Multislider */
let multisliderContainer = document.getElementById("multislider");
let multisliderDisplay = document.getElementById("multislider-display");
let multislider = new Multislider(multisliderContainer, {});
multislider.addObserver(function (sliderVals) {
    multisliderDisplay.innerHTML = sliderVals.map(val => " " + val);
});
multislider.setState({ sliderVals: [10, 50, 97, 81, 119, 81, 26, 114, 74, 47] });

/** Slider */
let sliderContainer = document.getElementById("slider");
let sliderDisplay = document.getElementById("slider-display");
let slider = new Slider(sliderContainer, {});
slider.addObserver(function (sliderVal) {
    sliderDisplay.innerHTML = sliderVal;
});
slider.setVal(30);

/** Meter */
let meterContainer = document.getElementById("meter");
let meterDisplay = document.getElementById("meter-display");

let audioCtx = new AudioContext();

let meter = new Meter(meterContainer, audioCtx, {});

let osc = audioCtx.createOscillator();
let lfo1 = audioCtx.createOscillator();
let lfo2 = audioCtx.createOscillator();
let amp1 = audioCtx.createGain();
let amp2 = audioCtx.createGain();
let amp3 = audioCtx.createGain();

lfo1.frequency.value = 0.5;
lfo2.frequency.value = 0.1;
amp3.gain.value = 0.5;
osc.frequency.value = 220;

lfo1.connect(amp1.gain);
lfo2.connect(amp1);
amp1.connect(amp2.gain);
osc.connect(amp2);
amp2.connect(amp3);
meter.receiveAudioFrom(amp3);

lfo1.start();
lfo2.start();
osc.start();

/** Dropmenu */
let dropmenuContainer = document.getElementById("dropmenu");
let dropmenuDisplay = document.getElementById("dropmenu-display");
let dropmenu = new Dropmenu(dropmenuContainer, {});
dropmenu.setMenuItems(["Zero", "One", "Two", "Three", "Four", "Five"]);
dropmenu.addObserver(function (selectedItem) {
    dropmenuDisplay.innerHTML = "Current selection: " + selectedItem;
});

/** Numberbox */
let numberboxContainer = document.getElementById("numberbox");
let numberboxDisplay = document.getElementById("numberbox-display");
let numberbox = new Numberbox(numberboxContainer, {
    precision: 2
});
numberbox.addObserver(function (val) {
    numberboxDisplay.innerHTML = val.toFixed(2);
});