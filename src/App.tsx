import _ from 'lodash';
import { useState } from 'react';
import './App.css';

function App() {
  type CalculatorData = {
    initValue: string;
    duration: string;
    interest: string;
    taxRate: string;
    netProfit: string;
    totalAmount: string;
  };
  type InputChangeEventType = { target: { value: any } };

  const [calcData, setCalcData] = useState<CalculatorData>({
    initValue: '0',
    duration: '0',
    interest: '0',
    taxRate: '0',
    netProfit: '0',
    totalAmount: '0',
  });

  function handleInitialValueChange(e: InputChangeEventType) {
    setCalcData({
      ...calcData,
      initValue: e.target.value,
    });
  }

  function handleDurationChange(e: InputChangeEventType) {
    setCalcData({
      ...calcData,
      duration: e.target.value,
    });
  }

  function handleInterestChange(e: InputChangeEventType) {
    setCalcData({
      ...calcData,
      interest: e.target.value,
    });
  }


  function handleTaxAmountChange(e: InputChangeEventType) {
    setCalcData({
      ...calcData,
      taxRate: e.target.value,
    });
  }

  function handleNetProfitChange() {
    const initValue = _.parseInt(calcData.initValue, 10);
    const duration = _.parseInt(calcData.duration, 10);
    const interest = parseFloat(calcData.interest) / 100;
    const taxRate = parseFloat(calcData.taxRate) / 100;
    let countNetProfit = (initValue * duration * (interest / 365));
    countNetProfit = (1 - taxRate) * countNetProfit;
    calcData.netProfit = _.toString(_.ceil(countNetProfit, 2));
    calcData.totalAmount = _.toString(_.ceil(_.sum([initValue, countNetProfit]), 2))

    return calcData.netProfit;
  }

  function handleTotalAmountChange() {
    return calcData.netProfit !== '0' ? calcData.totalAmount : '0';
  }

  return (
    <div className="App">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Bank Deposit Calculator</span>
        </label>
        <label className="input-group">
          <div className="input-row-group">
            <span>Initial Value</span>
            <input
              type="number"
              min={0}
              className="input input-bordered"
              value={calcData.initValue}
              onChange={handleInitialValueChange}
            />
            <span>zł</span>
          </div>
          <div className="input-row-group">
            <span>Duration</span>
            <input
              type="number"
              min={0}
              className="input input-bordered"
              value={calcData.duration}
              onChange={handleDurationChange}
            />
            <span>days</span>
          </div>
          <div className="input-row-group">
            <span>Interest</span>
            <input
              type="number"
              min={0}
              className="input input-bordered"
              value={calcData.interest}
              onChange={handleInterestChange}
            />
            <span>%</span>
          </div>
          <div className="input-row-group">
            <span>Tax Rate</span>
            <input
              type="number"
              min={0}
              className="input input-bordered"
              value={calcData.taxRate}
              onChange={handleTaxAmountChange}
            />
            <span>%</span>
          </div>
          <div className="input-row-group">
            <span>Net Profit</span>
            <input
              type="number"
              min={0}
              className="input input-bordered"
              value={handleNetProfitChange()}
              disabled
            />
            <span>zł</span>
          </div>
          <div className="input-row-group">
            <span>Total Amount</span>
            <input
              type="number"
              min={0}
              className="input input-bordered"
              value={handleTotalAmountChange()}
              disabled
            />
            <span>zł</span>
          </div>
        </label>
      </div>
    </div>
  );
}

export default App;
