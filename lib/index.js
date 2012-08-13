var relaySim = require('relay-sim'),
    World = relaySim.World,
    Electricity = relaySim.Electricity,
    Switch = relaySim.Switch,
    Relay = relaySim.Relay,
    Led = relaySim.Led,
    Fulladder = require('./fulladder');

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
    led1 = new Led(),
    led2 = new Led(),
    led3 = new Led(),
    led4 = new Led(),
    led5 = new Led(),
    fa1 = new Fulladder(),
    fa2 = new Fulladder(),
    fa3 = new Fulladder(),
    fa4 = new Fulladder();

w.summon(el);

w.summon(sw1);
w.summon(sw2);
w.summon(sw3);
w.summon(sw4);
w.summon(sw5);
w.summon(sw6);
w.summon(sw7);
w.summon(sw8);

w.summon(led1);
w.summon(led2);
w.summon(led3);
w.summon(led4);
w.summon(led5);

w.summon(fa1);
w.summon(fa2);
w.summon(fa3);
w.summon(fa4);

el.VCC.connect(fa1.VCC);
el.VCC.connect(fa2.VCC);
el.VCC.connect(fa3.VCC);
el.VCC.connect(fa4.VCC);

fa1.GND.connect(el.GND);
fa2.GND.connect(el.GND);
fa3.GND.connect(el.GND);
fa4.GND.connect(el.GND);

fa1.A.C.connect(el.GND);
fa1.B.C.connect(el.GND);
fa2.A.C.connect(el.GND);
fa2.B.C.connect(el.GND);
fa3.A.C.connect(el.GND);
fa3.B.C.connect(el.GND);
fa4.A.C.connect(el.GND);
fa4.B.C.connect(el.GND);

el.VCC.connect(sw1.A);
el.VCC.connect(sw2.A);
el.VCC.connect(sw3.A);
el.VCC.connect(sw4.A);
el.VCC.connect(sw5.A);
el.VCC.connect(sw6.A);
el.VCC.connect(sw7.A);
el.VCC.connect(sw8.A);

led1.C.connect(el.GND);
led2.C.connect(el.GND);
led3.C.connect(el.GND);
led4.C.connect(el.GND);
led5.C.connect(el.GND);

sw1.C.connect(fa1.A.A);
sw5.C.connect(fa1.B.A);

sw2.C.connect(fa2.A.A);
sw6.C.connect(fa2.B.A);

sw3.C.connect(fa3.A.A);
sw7.C.connect(fa3.B.A);

sw4.C.connect(fa4.A.A);
sw8.C.connect(fa4.B.A);

// キャリービット接続
el.VCC.connect(fa1.CI.N);
el.GND.connect(fa1.CI.P);

fa1.CO.P.connect(fa2.CI.P);
fa1.CO.N.connect(fa2.CI.N);

fa2.CO.P.connect(fa3.CI.P);
fa2.CO.N.connect(fa3.CI.N);

fa3.CO.P.connect(fa4.CI.P);
fa3.CO.N.connect(fa4.CI.N);

// 最後のキャリービットは出力へ
fa4.CO.P.connect(led5.A);

// 演算結果モニタ
fa1.SUM.connect(led1.A);
fa2.SUM.connect(led2.A);
fa3.SUM.connect(led3.A);
fa4.SUM.connect(led4.A);

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