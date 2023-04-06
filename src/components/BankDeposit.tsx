import _ from 'lodash';
import { useEffect, useState } from 'react';
import { CalcTitle } from './CalcTitle';
import { countNetProfit, countTotalAmount } from '../controllers/countProfit';
import { InputRow } from './InputRow';
import { ResultRow } from './ResultRow';

export type CalculatorData = {
  initValue: string;
  duration: string;
  interest: string;
  taxRate: string;
  netProfit: string;
  totalAmount: string;
};
type InputChangeEventType = { target: { value: any } };

export function BankDepositCalculator() {
  const storedCalcData = JSON.parse(localStorage.getItem('calcData') as string);
  const [calcData, setCalcData] = useState<CalculatorData>(storedCalcData || {
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

  function changeNetProfit() {
    calcData.netProfit = countNetProfit(calcData);

    return calcData.netProfit;
  }

  function changeTotalAmount() {
    calcData.totalAmount = countTotalAmount(calcData);

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

  useEffect(() => {
    localStorage.setItem('calcData', JSON.stringify(calcData));
  }, [calcData])

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
          <ResultRow name={'Net Profit'} value={changeNetProfit()} />
          <ResultRow name={'Total Amount'} value={changeTotalAmount()} />
        </label>
      </div>
    </>
  );
}
