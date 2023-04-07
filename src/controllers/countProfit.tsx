import _ from 'lodash';
import { CalculatorData } from '../components/BankDeposit';

export function countNetProfit({ taxRate, initValue, duration, interest}: CalculatorData) {
  return  _.toString(
    _.ceil((1 - (parseFloat(taxRate) / 100)) * ((_.parseInt(initValue, 10)) * (_.parseInt(duration, 10)) * ((parseFloat(interest) / 100) / 365)), 2)
  );
}

export function countTotalAmount( initValue: string, netProfit: string): string {
  return _.toString(_.ceil(_.sum([parseFloat(initValue), parseFloat(netProfit)]), 2));
}
