var beatLength = 1;

var hat;
var hSeq;

var hat2;
var h2Seq;

var kick;
var kSeq;

var snare;
var sSeq;

var bell;
var bSeq;

var block;
var blSeq;

var dot;
var dSeq;

var dot2;
var d2Seq;

function initKey(){

	var iAA = [
    [1/P4, 1/M2, 1, M2, P5]
	]

	var iV = randomInt(0, iAA.length);

	globalIArray = iAA[iV];

}

function loadHat(){

  var output = new MyGain(0.5);

  hat = new BufferPreset();
  hat.playbackRate = 20;
  hat.hat1();

  var f = new MyBiquad("highpass", 1000, 1);

  hat.connect(f);
  f.connect(output);
  output.connect(masterGain);

  var sL = 200;
  hSeq = new Sequence();
  hSeq.randomMultiples(sL, beatLength, [0.5]);
  hSeq.sumSequence();
  hSeq.add(0.25);
  hSeq = hSeq.sequence;

}

function loadHat2(){

  var output = new MyGain(0.4);

  hat2 = new BufferPreset();
  hat2.playbackRate = 100;
  hat2.hat1();

  var f = new MyBiquad("highpass", 5000, 1);

  hat2.connect(f);
  f.connect(output);
  output.connect(masterGain);

  var sL = 1000;
  h2Seq = new Sequence();
  h2Seq.randomMultiples(sL, beatLength, [0.125]);
  h2Seq.sumSequence();
  h2Seq = h2Seq.sequence;

}

function loadKick(){

  var output = new MyGain(0.4);

  kick = new BufferPreset();
  kick.playbackRate = 2;
  kick.kick();

  var f = new MyBiquad("lowpass", 5000, 1);
  var f2 = new MyBiquad("highpass", 50, 1);

  var dG = new MyGain(1);

  kick.connect(f);
  f.connect(dG);
  dG.connect(f2);
  f2.connect(output);

  output.connect(masterGain);

  var sL = 200;
  kSeq = new Sequence();
  kSeq.randomMultiples(sL, beatLength, [0.5]);
  kSeq.sumSequence();
  kSeq.add(16);
  kSeq = kSeq.sequence;

}

function loadSnare(){

  var output = new MyGain(0.2);

  snare = new BufferPreset();
  snare.playbackRate = 16;
  snare.snare();

  var f = new MyBiquad("lowpass", 5000, 1);
  var f2 = new MyBiquad("highpass", 400, 1);
  // f2.biquad.gain.value = -5;

  snare.connect(f);
  f.connect(f2);
  f2.connect(output);
  output.connect(masterGain);

  var sL = 103;
  sSeq = new Sequence();
  sSeq.randomMultiples(sL, beatLength, [1]);
  sSeq.sumSequence();
  sSeq.add(0.5);
  sSeq = sSeq.sequence;

}

function loadBell(){

  var output = new MyGain(0.4);

  bell = new BufferPreset();
  bell.playbackRate = 8;
  bell.struckMetal();

  var f = new MyBiquad("lowpass", 5000, 1);
  var f2 = new MyBiquad("highpass", 300, 1);

  bell.connect(f);
  f.connect(f2);
  f2.connect(output);
  output.connect(masterGain);

  var sL = 103;
  bSeq = new Sequence();
  bSeq.randomMultiples(sL, beatLength, [1]);
  bSeq.sumSequence();
  bSeq.add(0.75);
  bSeq = bSeq.sequence;

}

function loadBlock(){

  var output = new MyGain(0.2);

  block = new BufferPreset();
  block.playbackRate = 2;
  block.block();

  var f = new MyBiquad("lowpass", 5000, 1);

  block.connect(f);
  f.connect(output);
  output.connect(masterGain);

  var sL = 200;
  blSeq = new Sequence();
  blSeq.randomMultiples(sL, beatLength, [0.25]);
  blSeq.sumSequence();
  blSeq = blSeq.sequence;


}

function loadDot(fund){

  var output = new MyGain(0.18);

  dot = new BufferPreset();
  dot.playbackRate = 2;
  dot.dot(fund);

  var f = new MyBiquad("lowpass", 1000, 1);
  var f2 = new MyBiquad("highpass", 200, 1);
  var d = new Effect();
  d.randomShortDelay();
  var dL = new LFO(0, 1, 0.9);
  dL.buffer.makeSawtooth(4);

  var d2 = new MyStereoDelay(0.75, 0.75, 0.4, 1);
  var d3 = new MyStereoDelay(0, 0.75, 0, 1);
  d2.output.gain.value = 0.125;

  dot.connect(f);

  f.connect(d); dL.connect(d.output.gain);

  f.connect(d2);
  d2.connect(d3);

  f.connect(f2);
  d.connect(f2);
  d3.connect(f2);

  f2.connect(output);

  output.connect(masterGain);

  var sL = 200;
  dSeq = new Sequence();
  dSeq.randomMultiples(sL, beatLength, [4, 6, 8]);
  dSeq.sumSequence();
  dSeq = dSeq.sequence;

  dL.start();

}

function loadDot2(fund){

  var output = new MyGain(0.125);

  dot2 = new BufferPreset();
  dot2.playbackRate = 2;
  dot2.dot(fund);

  var f = new MyBiquad("lowpass", 1000, 1);
  var f2 = new MyBiquad("highpass", 200, 1);
  var d = new Effect();
  d.randomShortDelay();
  var dL = new LFO(0, 1, 0.9);
  dL.buffer.makeSawtooth(4);

  var d2 = new MyStereoDelay(0.75, 0.75, 0.4, 1);
  var d3 = new MyStereoDelay(0.75, 0, 0, 1);
  d2.output.gain.value = 0.125;

  dot2.connect(f);

  f.connect(d); dL.connect(d.output.gain);

  f.connect(d2);

  f.connect(f2);
  d.connect(f2);
  d2.connect(f2);

  f2.connect(output);

  output.connect(masterGain);

  var sL = 200;
  d2Seq = new Sequence();
  d2Seq.randomMultiples(sL, beatLength, [4, 6, 8]);
  d2Seq.sumSequence();
  d2Seq.add(16+3);
  d2Seq = d2Seq.sequence;

  dL.start();

}

function playDrums(){

  for(var i=0; i<bSeq.length; i++){

    bell.startAtTime(randomFloat(0.9999, 1.0001)*bSeq[i]+globalNow);
    bell.bufferSource.playbackRate.setValueAtTime(randomFloat(7.9, 9.1), bSeq[i]+globalNow);

  }

  for(var i=0; i<sSeq.length; i++){

    snare.startAtTime(randomFloat(0.9999, 1.0001)*sSeq[i]+globalNow);
    snare.bufferSource.playbackRate.setValueAtTime(randomFloat(15.9, 16.1), sSeq[i]+globalNow);

  }

  for(var i=0; i<kSeq.length; i++){

    if(kSeq[i]<111){
      kick.startAtTime(randomFloat(0.9999, 1.0001)*kSeq[i]+globalNow);
    }

  }

  for(var i=0; i<hSeq.length; i++){

    if(hSeq[i]<90){

      hat.startAtTime(randomFloat(0.9999, 1.0001)*hSeq[i]+globalNow);
      hat.bufferSource.playbackRate.setValueAtTime(randomFloat(19.9, 20.2), hSeq[i]+globalNow);

    }

  }

  for(var i=0; i<h2Seq.length; i++){

    if(h2Seq[i]<106){
      hat2.startAtTime(h2Seq[i]+globalNow);
      hat2.bufferSource.playbackRate.setValueAtTime(randomFloat(99.9, 100.1), h2Seq[i]+globalNow);
    }

  }

  for(var i=0; i<blSeq.length; i++){

    block.startAtTime(randomFloat(0.9999, 1.0001)*blSeq[i]+globalNow);
    block.bufferSource.playbackRate.setValueAtTime(randomFloat(99.9, 100.1), blSeq[i]+globalNow);
    block.output.gain.setValueAtTime(randomInt(0, 2), blSeq[i]+globalNow);

  }

  for(var i=0; i<dSeq.length; i++){

    if(dSeq[i]<111){
      dot.startAtTime(randomFloat(0.9999, 1.0001)*d2Seq[i]+globalNow);
    }
    // dot.output.gain.setValueAtTime(randomInt(0, 2), dSeq[i]+globalNow);

  }

  for(var i=0; i<dSeq.length; i++){

    if(dSeq[i]<111){
      dot2.startAtTime(randomFloat(0.9999, 1.0001)*d2Seq[i]+globalNow);
    }
    // dot.output.gain.setValueAtTime(randomInt(0, 2), dSeq[i]+globalNow);

  }

}

function addSine(startTime, stopTime, fund, gainVal){

  var startTime = startTime;
  var stopTime = stopTime;
  var gainVal = gainVal;
  var fund = fund;

  var output = new MyGain(gainVal);
  var bufferLength = 1;

  var pArray = [P5, M3, P4, M6, 2, M2*2, M3*2, P4*2];

  var b = new MyBuffer(1, bufferLength, audioCtx.sampleRate);
  var b2 = new MyBuffer(1, bufferLength, audioCtx.sampleRate);

  b.playbackRate = 0.25;
  b.loop = true;
  b.addSine(fund, 1);
  b.applyRamp(0.5, 1, 1);

  for(var i=0; i<pArray.length; i++){

    b2.makeConstant(0);
    b2.addSine(fund*pArray[i], randomFloat(0.3, 1));
    b2.addSine(fund*pArray[i]+randomFloat(1, 10), randomFloat(0.3, 1));
    b2.applyRamp(randomFloat(0.1, 0.9), randomFloat(0.1, 2), randomFloat(0.1, 4));

    b.addBuffer(b2.buffer);

  }

  b.normalize(-1, 1);
  b.applyRamp(0.5, 0.8, 2);

  var d = new Effect();
  d.randomEcho();
  d.on();
  d.output.gain.value = 0.25;

  var w = new Effect;
  w.fmShaper(fund, fund*2, 0.0003);
  w.on();
  w.output.gain.value = 0.3;

  var w2 = new Effect;
  w2.amShaper(fund*0.25, fund*0.5, 0.000625);
  w2.on();

  var wF = new MyBiquad("highpass", 20, 1);

  b.connect(d);

  d.connect(w);
  d.connect(w2);

  w.connect(wF);
  w2.connect(wF);

  wF.connect(output);
  d.connect(output);
  b.connect(output);

  output.connect(masterGain);

  b.startAtTime(globalNow+startTime);
  b.stopAtTime(globalNow+stopTime);

}

function tone(startTime, stopTime, fund, gainVal){

  var startTime = startTime;
  var stopTime = stopTime;
  var fund = fund;
  var gainVal = gainVal;

  var output = new MyGain(gainVal);

  var b = new MyBuffer(1, 1, audioCtx.sampleRate);
  b.playbackRate = 1;
  b.loop = true;

  b.addSine(fund, 1);
  b.applyDecay(4);

  b.connect(output);
  output.connect(masterGain);

  b.startAtTime(globalNow+startTime);
  b.stopAtTime(globalNow+stopTime);

}

function toneSequence(startTime, stopTime, fund, gainVal){

  var startTime = startTime;
  var stopTime = stopTime;
  var fund = fund;
  var gainVal = gainVal;

  var output = new MyGain(gainVal);

  var b = new MyBuffer(1, 1, audioCtx.sampleRate);
  b.playbackRate = 1;
  b.loop = true;
  b.addSine(1, 1);
  b.start();

  var aB = new MyBuffer(1, 1, audioCtx.sampleRate);
  aB.playbackRate = 1;
  aB.makeConstant(1);
  aB.applyDecay(4);
  var aG = new MyGain(0);

  var f = new MyBiquad("highpass", 100, 1);

  var d = new MyStereoDelay(beatLength*0.5, beatLength*0.25, 0.2, 1);
  d.output.gain.value = 0.25;

  b.connect(aG); aB.connect(aG.gain.gain);
  aG.connect(f);

  f.connect(d);

  f.connect(output);
  d.connect(output);

  output.connect(masterGain);

  var sL = 200;
  var pArray = [1/P5, 1/P4, 1/m3, 1, M2];
  var oArray = [1, 0.25, 0.5];
  var lArray = [1, 0.5];

  var pSeq = new Sequence();
  pSeq.urnSelect(sL, pArray);
  pSeq.multiply(fund);

  var oSeq = new  Sequence();
  oSeq.randomMultiples(sL, beatLength, oArray);

  oSeq.sumSequence();
  oSeq.add(startTime);
  oSeq.add(globalNow);

  pSeq = pSeq.sequence;
  oSeq = oSeq.sequence;

  for(var i=0; i<oSeq.length; i++){

    if(oSeq[i]<globalNow+stopTime){
      aB.startAtTime(oSeq[i]*randomFloat(0.9999, 1.0001));
      aB.bufferSource.playbackRate.setValueAtTime(randomArrayValue(lArray), oSeq[i]);
      b.bufferSource.playbackRate.setValueAtTime(pSeq[i], oSeq[i]);
    }

  }

}
