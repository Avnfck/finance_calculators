import _ from 'lodash';
import { BankDepositData } from '../calculators/BankDeposit';
import { RevertBankDepositData } from '../calculators/BankDepositReverted';

export function countNetProfit({
  capitalizationSwitch,
  capitalization,
  duration,
  initValue,
  interest,
  taxRate,
}: BankDepositData) {
  if (capitalizationSwitch) {
    return _.toString(
      _.floor(
        (parseFloat(initValue) *
          Math.pow(
            1 + parseFloat(interest) / (parseFloat(capitalization) * 100),
            parseFloat(capitalization) * (parseFloat(duration) / 365)
          ) -
          parseFloat(initValue)) *
          (1 - parseFloat(taxRate) / 100),
        2
      )
    );
  }
  return _.toString(
    _.floor(
      (1 - parseFloat(taxRate) / 100) *
        (parseFloat(initValue) *
          _.parseInt(duration, 10) *
          (parseFloat(interest) / 100 / 365)),
      2
    )
  );
}

export function countTotalAmount(initValue: string, netProfit: string): string {
  return _.toString(
    _.floor(_.sum([parseFloat(initValue), parseFloat(netProfit)]), 2)
  );
}

export function countInitValue({
  totalAmount,
  duration,
  interest,
  taxRate,
}: RevertBankDepositData): string {
  return _.toString(
    _.ceil(
      parseFloat(totalAmount) /
        (1 +
          parseFloat(duration) *
            (parseFloat(interest) / 100 / 365) *
            (1 - parseFloat(taxRate) / 100)),
      2
    )
  );
}
