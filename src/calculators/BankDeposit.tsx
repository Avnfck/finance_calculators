import { useEffect, useState } from 'react';
import { CalcTitle } from '../components/CalcTitle';
import { countNetProfit, countTotalAmount } from '../controllers/countProfit';
import { InputRow } from '../components/InputRow';
import { ResultRow } from '../components/ResultRow';
import { CapitalizationCheckbox } from '../components/CapitalizationCheckbox';

export type BankDepositData = {
  capitalization: string;
  capitalizationSwitch: boolean;
  duration: string;
  initValue: string;
  interest: string;
  taxRate: string;
};
type InputChangeEventType = { target: { value: any } };

export function BankDepositCalculator() {
  const storedCalcData = JSON.parse(
    localStorage.getItem('depositCalculator') as string
  );
  const [calcData, setCalcData] = useState<BankDepositData>(
    storedCalcData || {
      capitalization: '0',
      capitalizationSwitch: false,
      duration: '0',
      initValue: '0',
      interest: '0',
      taxRate: '0',
    }
  );

  function handleCapitalizationCheckBoxChange(e: InputChangeEventType) {
    setCalcData({
      ...calcData,
      capitalizationSwitch: e.target.value,
    });
  }

  function handleCapitalizationChange(e: InputChangeEventType) {
    setCalcData({
      ...calcData,
      capitalization: e.target.value,
    });
  }

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

  const netProfit = countNetProfit(calcData);
  const totalAmount = countTotalAmount(calcData.initValue, netProfit);

  function handleResetButton() {
    setCalcData({
      capitalization: '0',
      capitalizationSwitch: false,
      duration: '0',
      initValue: '0',
      interest: '0',
      taxRate: '0',
    });
  }

  useEffect(() => {
    localStorage.setItem('depositCalculator', JSON.stringify(calcData));
  }, [calcData]);

  return (
    <>
      <div className="form-control">
        <CalcTitle name={'Bank Deposit Calculator'} reset={handleResetButton} />
        <CapitalizationCheckbox value={calcData.capitalizationSwitch} handler={handleCapitalizationCheckBoxChange} />
        <label className="input-group">
          <InputRow
            name={'Capitalization'}
            value={calcData.capitalization}
            unit={'days'}
            handler={handleCapitalizationChange}
          />
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
          <ResultRow name={'Net Profit'} value={netProfit || '0'} />
          <ResultRow name={'Total Amount'} value={totalAmount || '0'} />
        </label>
      </div>
    </>
  );
}
