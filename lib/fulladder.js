var util = require('util'),
    relaySim = require('relay-sim'),
    voltage = relaySim.voltage,
    Part = relaySim.Part,
    Point = relaySim.Point,
    Relay = relaySim.Relay;

function Fulladder () {
  this.A = {
    A: new Point(voltage.NEUTRAL),
    C: new Point(voltage.NEUTRAL)
  };
  this.B = {
    A: new Point(voltage.NEUTRAL),
    C: new Point(voltage.NEUTRAL)
  };
  this.CI = {
    P: new Point(voltage.NEUTRAL),
    N: new Point(voltage.NEUTRAL)
  };
  this.CO = {
    P: new Point(voltage.NEUTRAL),
    N: new Point(voltage.NEUTRAL)
  };
  this.SUM = new Point(voltage.NEUTRAL);

  this.VCC = new Point(voltage.NEUTRAL);
  this.GND = new Point(voltage.NEUTRAL);

  var a1 = new Relay(),
      a2 = new Relay(),
      b1 = new Relay(),
      b2 = new Relay();

  // 外部から内部へ
  this.A.A.connect(a1.A);
  this.A.C.connect(a1.C);
  
  this.B.A.connect(b1.A);
  this.B.C.connect(b1.C);
  
  // 2つずつリレーを結合
  a1.A.connect(a2.A);
  a1.C.connect(a2.C);

  b1.A.connect(b2.A);
  b1.C.connect(b2.C);

  // VCCを接続
  this.VCC.connect(a1.R.C);

  // キャリー入力接続
  this.CI.P.connect(a1.L.C);
  this.CI.N.connect(a2.R.C);

  // キャリー出力接続
  b1.L.C.connect(this.CO.P);
  b2.R.C.connect(this.CO.N);

  // 加算結果接続
  a2.L.C.connect(this.SUM);

  a1.L.A.connect(b1.L.B);
  a1.L.B.connect(b1.L.A);

  a2.L.A.connect(b2.L.B);
  a2.L.B.connect(b2.L.A);

  a2.R.A.connect(b2.R.B);
  a2.R.B.connect(b2.R.A);

  a1.L.B.connect(a1.R.A);

  a1.R.B.connect(a2.R.A);

  a2.L.A.connect(b1.R.A);

  b1.R.B.connect(b2.L.A);

  a1.L.C.connect(b1.R.C);

  a2.R.C.connect(b2.L.C);

  this.parts = [a1, a2, b1, b2];
}

util.inherits(Fulladder, Part);

Fulladder.prototype.drive = function () {
  this.parts.forEach(function (part) {
    part.drive();
  });
};

module.exports = Fulladder;

if (!module.parent) {
  var World = relaySim.World,
      Electricity = relaySim.Electricity;


  var w1 = new World(),
      el1 = new Electricity(),
      fa1 = new Fulladder();

  w1.summon(el1);
  w1.summon(fa1);

  el1.VCC.connect(fa1.VCC);
  el1.GND.connect(fa1.GND);

  el1.VCC.connect(fa1.CI.N);

  el1.VCC.connect(fa1.A.A);
  el1.GND.connect(fa1.A.C);

  el1.VCC.connect(fa1.B.A);
  el1.GND.connect(fa1.B.C);

  w1.tick();
  w1.tick();

  console.log('               Sum:', fa1.SUM.voltage);
  console.log('Carry Out Positive:', fa1.CO.P.voltage);
  console.log('Carry Out Negative:', fa1.CO.N.voltage);
}