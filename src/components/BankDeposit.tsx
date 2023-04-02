import _ from 'lodash';
import { useState } from 'react';
import { CalcTitle } from './CalcTitle';
import { InputRow } from './InputRow';
import { ResultRow } from './ResultRow';

type CalculatorData = {
  initValue: string;
  duration: string;
  interest: string;
  taxRate: string;
  netProfit: string;
  totalAmount: string;
};
type InputChangeEventType = { target: { value: any } };

export function GenerateCalculator() {
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

    let countNetProfit = initValue * duration * (interest / 365);
    countNetProfit = (1 - taxRate) * countNetProfit;
    calcData.netProfit = _.toString(_.ceil(countNetProfit, 2));
    calcData.totalAmount = _.toString(
      _.ceil(_.sum([initValue, countNetProfit]), 2)
    );
    
    return calcData.netProfit;
  }

  function handleTotalAmountChange() {
    return calcData.netProfit !== '0' ? calcData.totalAmount : '0';
  }

  function handleResetButton() {
    setCalcData({
      ...calcData,
      initValue: '0',
      duration: '0',
      interest: '0',
      taxRate: '0',
    });
  }

  return (
    <>
      <div className="form-control">
        <CalcTitle name={'Bank Deposit Calculator'} reset={handleResetButton} />
        <label className="input-group">
          <InputRow
            name={'Initial Value'}
            value={calcData.initValue}
            step={'100'}
            handler={handleInitialValueChange}
          />
          <InputRow
            name={'Duration'}
            value={calcData.duration}
            unit={'days'}
            step={'10'}
            handler={handleDurationChange}
          />
          <InputRow
            name={'Interest'}
            value={calcData.interest}
            unit={'%'}
            step={'0.5'}
            handler={handleInterestChange}
          />
          <InputRow
            name={'Tax Rate'}
            value={calcData.taxRate}
            unit={'%'}
            step={'5'}
            handler={handleTaxAmountChange}
          />
          <ResultRow
            name={'Net Profit'}
            value={handleNetProfitChange()}
          />
          <ResultRow
            name={'Total Amount'}
            value={handleTotalAmountChange()}
          />
        </label>
      </div>
    </>
  );
}
