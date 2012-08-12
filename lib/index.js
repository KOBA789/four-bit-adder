var relaySim = require('relay-sim'),
    World = relaySim.World,
    Electricity = relaySim.Electricity,
    Switch = relaySim.Switch,
    Relay = relaySim.Relay,
    Led = relaySim.Led;

var w = new World(),
    el = new Electricity(),
    sw1 = new Switch(),
    sw2 = new Switch(),
    sw3 = new Switch(),
    sw4 = new Switch(),
    sw5 = new Switch(),
    sw6 = new Switch(),
    sw7 = new Switch(),
    sw8 = new Switch(),
    r1 = new Relay(),
    r2 = new Relay(),
    r3 = new Relay(),
    r4 = new Relay(),
    r5 = new Relay(),
    r6 = new Relay(),
    r7 = new Relay(),
    r8 = new Relay(),
    r9 = new Relay(),
    r10 = new Relay(),
    r11 = new Relay(),
    r12 = new Relay(),
    r13 = new Relay(),
    r14 = new Relay(),
    r15 = new Relay(),
    r16 = new Relay(),
    led1 = new Led(),
    led2 = new Led(),
    led3 = new Led(),
    led4 = new Led(),
    led5 = new Led();

w.summon(el);

w.summon(sw1);
w.summon(sw2);
w.summon(sw3);
w.summon(sw4);
w.summon(sw5);
w.summon(sw6);
w.summon(sw7);
w.summon(sw8);

w.summon(r1);
w.summon(r2);
w.summon(r3);
w.summon(r4);
w.summon(r5);
w.summon(r6);
w.summon(r7);
w.summon(r8);
w.summon(r9);
w.summon(r10);
w.summon(r11);
w.summon(r12);
w.summon(r13);
w.summon(r14);
w.summon(r15);
w.summon(r16);

w.summon(led1);
w.summon(led2);
w.summon(led3);
w.summon(led4);
w.summon(led5);

r1.A.connect(r2.A);
r1.C.connect(r2.C);

r3.A.connect(r4.A);
r3.C.connect(r4.C);

el.VCC.connect(sw1.A);
sw1.C.connect(r1.A);

el.VCC.connect(sw5.A);
sw5.C.connect(r3.A);

r1.C.connect(el.GND);
r3.C.connect(el.GND);

r1.L.B.connect(r3.L.A);
r1.L.A.connect(r3.L.B);
r1.R.B.connect(r3.R.A);
r1.R.A.connect(r3.R.B);

r4.L.A.connect(r3.R.B);
r4.L.B.connect(r3.R.A);

r4.R.A.connect(r2.R.B);
r4.R.B.connect(r2.R.A);

r2.R.B.connect(r2.L.B);

r2.L.B.connect(r1.L.A);

r1.L.C.connect(r3.R.C);
r2.R.C.connect(r4.L.C);

el.VCC.connect(r1.L.C);
el.GND.connect(r2.R.C);

r1.R.C.connect(led1.A);
led1.C.connect(el.GND);

// ----------------------------
r5.A.connect(r6.A);
r5.C.connect(r6.C);

r7.A.connect(r8.A);
r7.C.connect(r8.C);

el.VCC.connect(sw2.A);
sw2.C.connect(r5.A);

el.VCC.connect(sw6.A);
sw6.C.connect(r7.A);

r5.C.connect(el.GND);
r7.C.connect(el.GND);

r5.L.B.connect(r7.L.A);
r5.L.A.connect(r7.L.B);
r5.R.B.connect(r7.R.A);
r5.R.A.connect(r7.R.B);

r8.L.A.connect(r7.R.B);
r8.L.B.connect(r7.R.A);

r8.R.A.connect(r6.R.B);
r8.R.B.connect(r6.R.A);

r6.R.B.connect(r6.L.B);

r6.L.B.connect(r5.L.A);

r5.L.C.connect(r7.R.C);
r6.R.C.connect(r8.L.C);

r3.L.C.connect(r5.L.C);
r4.R.C.connect(r6.R.C);

r5.R.C.connect(led2.A);
led2.C.connect(el.GND);

// ----------------------------
r9.A.connect(r10.A);
r9.C.connect(r10.C);

r11.A.connect(r12.A);
r11.C.connect(r12.C);

el.VCC.connect(sw3.A);
sw3.C.connect(r9.A);

el.VCC.connect(sw7.A);
sw7.C.connect(r11.A);

r9.C.connect(el.GND);
r11.C.connect(el.GND);

r9.L.B.connect(r11.L.A);
r9.L.A.connect(r11.L.B);
r9.R.B.connect(r11.R.A);
r9.R.A.connect(r11.R.B);

r12.L.A.connect(r11.R.B);
r12.L.B.connect(r11.R.A);

r12.R.A.connect(r10.R.B);
r12.R.B.connect(r10.R.A);

r10.R.B.connect(r10.L.B);

r10.L.B.connect(r9.L.A);

r9.L.C.connect(r11.R.C);
r10.R.C.connect(r12.L.C);

r7.L.C.connect(r9.L.C);
r8.R.C.connect(r10.R.C);

r9.R.C.connect(led3.A);
led3.C.connect(el.GND);

// ----------------------------
r13.A.connect(r14.A);
r13.C.connect(r14.C);

r15.A.connect(r16.A);
r15.C.connect(r16.C);

el.VCC.connect(sw4.A);
sw4.C.connect(r13.A);

el.VCC.connect(sw8.A);
sw8.C.connect(r15.A);

r13.C.connect(el.GND);
r15.C.connect(el.GND);

r13.L.B.connect(r15.L.A);
r13.L.A.connect(r15.L.B);
r13.R.B.connect(r15.R.A);
r13.R.A.connect(r15.R.B);

r16.L.A.connect(r15.R.B);
r16.L.B.connect(r15.R.A);

r16.R.A.connect(r14.R.B);
r16.R.B.connect(r14.R.A);

r14.R.B.connect(r14.L.B);

r14.L.B.connect(r13.L.A);

r13.L.C.connect(r15.R.C);
r14.R.C.connect(r16.L.C);

r11.L.C.connect(r13.L.C);
r12.R.C.connect(r14.R.C);

r13.R.C.connect(led4.A);
led4.C.connect(el.GND);

r16.R.C.connect(led5.A);
led5.A.connect(el.GND);

w.tick();

Led.prototype.toLight = function () {
  return (this.status ? '\x1b[32m1' : '\x1b[31m0') + '\x1b[39m';
};

Switch.prototype.toLight = function () {
  return (this.status ? '\x1b[32m1' : '\x1b[31m0') + '\x1b[39m';
};

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (chunk) {
  switch (chunk[0]) {
  case 'x':
    process.exit();
    break;
  case 'r':
    sw1.status = !(sw1.status);
    break;
  case 'e':
    sw2.status = !(sw2.status);
    break;
  case 'w':
    sw3.status = !(sw3.status);
    break;
  case 'q':
    sw4.status = !(sw4.status);
    break;
  case 'f':
    sw5.status = !(sw5.status);
    break;
  case 'd':
    sw6.status = !(sw6.status);
    break;
  case 's':
    sw7.status = !(sw7.status);
    break;
  case 'a':
    sw8.status = !(sw8.status);
    break;
  }
});

setInterval(function () {
  console.log(' ', sw4.toLight(), sw3.toLight(), sw2.toLight(), sw1.toLight());
  console.log(' ', sw8.toLight(), sw7.toLight(), sw6.toLight(), sw5.toLight());
  console.log(led5.toLight(), led4.toLight(), led3.toLight(), led2.toLight(), led1.toLight());
  console.log('---------');
  w.tick();
}, 100);