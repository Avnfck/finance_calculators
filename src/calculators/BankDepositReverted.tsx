import { useEffect, useState } from 'react';
import { CalcTitle } from '../components/CalcTitle';
import { countNetProfit, countInitValue } from '../controllers/countProfit';
import { InputRow } from '../components/InputRow';
import { ResultRow } from '../components/ResultRow';

export type RevertBankDepositData = {
  duration: string;
  interest: string;
  taxRate: string;
  totalAmount: string;
};
type InputChangeEventType = { target: { value: any } };

export function RevertedBankDepositCalculator() {
  const storedCalcData = JSON.parse(localStorage.getItem('revertDepoCalculator') as string);
  const [calcData, setCalcData] = useState<RevertBankDepositData>(
    storedCalcData || {
      duration: '0',
      interest: '0',
      taxRate: '0',
      totalAmount: '0',
    }
  );

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

  function handleTotalAmountChange(e: InputChangeEventType) {
    setCalcData({
      ...calcData,
      totalAmount: e.target.value,
    });
  }

  const initValue = countInitValue(calcData);
  const netProfit = countNetProfit({ initValue: initValue, ...calcData });

  function handleResetButton() {
    setCalcData({
      totalAmount: '0',
      duration: '0',
      interest: '0',
      taxRate: '0',
    });
  }

  useEffect(() => {
    localStorage.setItem('revertDepoCalculator', JSON.stringify(calcData));
  }, [calcData]);

  return (
    <>
      <div className="form-control">
        <CalcTitle
          name={'Revert Bank Deposit Calc'}
          reset={handleResetButton}
        />
        <label className="input-group">
          <InputRow
            name={'Total Amount'}
            value={calcData.totalAmount}
            unit={'PLN'}
            step={'100'}
            handler={handleTotalAmountChange}
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
          <ResultRow name={'Initial Value'} value={initValue || '0'} />
          <ResultRow name={'Net Profit'} value={netProfit || '0'} />
        </label>
      </div>
    </>
  );
}
