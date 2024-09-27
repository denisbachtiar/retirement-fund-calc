import { useState } from 'react';
import './App.css';
import { NumericFormat } from 'react-number-format';

function App() {
  const [nominalInvest, setNominalInvest] = useState(0);
  const [yearlyReturn, setYearlyReturn] = useState(0); //in percent
  const [yearTimes, setYearTimes] = useState(0);
  const [result, setResult] = useState(0);

  const calculate = () => {
    let res = 0;

    for (let i = 0; i < yearTimes; i++) {
      let x = nominalInvest * 12;
      let y = x + res;
      let xy = y * (yearlyReturn / 100); 
      y = xy + y;
      res = y; 
    }

    setResult(res);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <>
      <div className="box">
        <p>Nominal yang diinvestasikan per bulan:</p>
        <NumericFormat
          prefix="Rp "
          thousandSeparator
          value={nominalInvest}
          onValueChange={(e) => setNominalInvest(Number(e.floatValue))}
        />
      </div>
      <div className="box">
        <p>Return per tahun:</p>
        <NumericFormat
          suffix="%"
          value={yearlyReturn}
          onValueChange={(e) => setYearlyReturn(Number(e.floatValue))}
        />
      </div>
      <div className="box">
        <p>Investasi untuk berapa lama:</p>
        <NumericFormat
          suffix=" Tahun"
          value={yearTimes}
          onValueChange={(e) => setYearTimes(Number(e.floatValue))}
        />
      </div>

      <button type="button" onClick={() => calculate()}>
        Hitung
      </button>

      <h2>Hasil: {formatNumber(result)}</h2>
    </>
  );
}

export default App;
