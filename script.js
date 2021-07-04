var masterGain;
var fadeFilter;
var offlineBuffer;
var globalNow;
var fund;

setTimeout(function(){bufferLoaded();}, 1000);

function bufferLoaded(){

	var gain = audioCtx.createGain();
	gain.gain.value = 2;

	var f = new MyBiquad("highpass", 10, 1);

	fadeFilter = new FilterFade(0);

	masterGain = audioCtx.createGain();
	masterGain.gain.value = 0;
	masterGain.connect(gain);
	gain.connect(fadeFilter.input);
	fadeFilter.connect(f);
	f.connect(audioCtx.destination);

	// INITIALIZATIONS

	fund = randomArrayValue([301.8497846647408, 313.41466672032993, 335.16055632081446, 310.0255387215968, 327.2759934743954, 332.2676657705831, 348.1808285172197, 323.7052188324729]) // randomFloat(300, 350); // 301.8497846647408*, 313.41466672032993*, 335.16055632081446*, 310.0255387215968*, 327.2759934743954*, 332.2676657705831*, 348.1808285172197*, 323.7052188324729* 303, 345, 315, 342, 325, 338, 314, 317, 345, 308, 313, 347

	loadKick();
	loadHat();
	loadSnare();
	loadBell();
	loadHat2();
	loadBlock();
	loadDot(fund*0.5);
	loadDot2(fund*0.5*(1/P5));

	if(onlineButton.innerHTML == "online"){
		setTimeout(function(){onlineBufferLoaded();}, 1000);
	}

	else if(onlineButton.innerHTML == "offline"){
		setTimeout(function(){offlineBufferLoaded();}, 1000);
	}

}

//--------------------------------------------------------------

function runPatch(){

		fadeFilter.start(1, 50);
		globalNow = audioCtx.currentTime;

		// PERC
		playDrums();

		// PAD
		addSine(0,   65, 2*fund*P4, 0.1);
		addSine(0+2, 65, 2*fund*P4, 0.1);

		addSine(80,   111, 2*fund*P4, 0.1);
		addSine(80+2, 111, 2*fund*P4, 0.1);

		// TONE
		tone(16.25, 112, fund, 0.17);

		// KEYS
		toneSequence(32, 99, fund*2, 0.1*0.85);
		toneSequence(48, 99, fund*0.25, 0.1*1.5);
		toneSequence(52, 99, fund, 0.1*0.9);


		masterGain.gain.setValueAtTime(1, 1+globalNow);

}

//--------------------------------------------------------------

function stopPatch(){

	var now = audioCtx.currentTime;
	fadeFilter.start(0, 20);
	setTimeout(function(){masterGain.disconnect();}, 100);
	startButton.innerHTML = "reset";

	if(onlineButton.innerHTML=="offline"){
		offlineBuffer.stop();
	}

}

//--------------------------------------------------------------

function onlineBufferLoaded(){

	startButton.disabled = false;
	startButton.innerHTML = "start";

}

//--------------------------------------------------------------

function offlineBufferLoaded(){

	runPatch();

	audioCtx.startRendering().then(function(renderedBuffer){

		offlineBuffer = onlineCtx.createBufferSource();
		offlineBuffer.buffer = renderedBuffer

		startButton.disabled = false;
		startButton.innerHTML = "start";

		offlineBuffer.connect(onlineCtx.destination);

	})

}
