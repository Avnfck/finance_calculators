import './App.css';
import { BankDepositCalculator } from './calculators/BankDeposit';
import { RevertedBankDepositCalculator } from './calculators/BankDepositReverted';

function App() {
  return (
    <div className="App">
      <BankDepositCalculator />
      <br />
      <RevertedBankDepositCalculator />
    </div>
  );
}

export default App;
