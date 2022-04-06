import './App.css';

import vaultRecovery from 'vault-recovery';
import { useState } from 'react';

function App() {

  const [mnemonic, setMnemonic] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const generateMnemonic = () => {
    let newMnemonic = vaultRecovery.newMnemonic();
    setMnemonic(newMnemonic.join(' '));
    setPublicKey(vaultRecovery.recoverFromMnemonic(newMnemonic, 'ed25519').accountHex());
  }

  const verifyMnemonic = () => {
    let textarea = document.getElementById('enterMnemonic') as HTMLTextAreaElement;
    let mnemonic = textarea.value;
    if (!mnemonic) throw new Error('Invalid mnemonic');
    let mnemonicArr = mnemonic.split(' ');
    if (mnemonicArr.length !== 24) {
      alert('Invalid mnemonic length, should be 24 words, received: ' + mnemonicArr.length);
      return;
    }
    try {
      let keypair = vaultRecovery.recoverFromMnemonic(mnemonicArr, 'ed25519');
      if (keypair.accountHex() !== publicKey) {
        alert('Verification failure: Recovered key did not match');
      } else {
        alert('Verified Mnemonic!');
      }
    } catch (err) {
      alert('Verification failure: ' + err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={generateMnemonic}>Generate Mnemonic</button>
        <p id="mnemonic-block">{mnemonic}</p>
        <br />
        Key From Mnemonic:
        <div className="code-block">
          <code>{publicKey}</code>
        </div>
        <br />
        Enter Mnemonic:
        <div>
          <textarea id="enterMnemonic" className="large-text-field"></textarea>
        </div>
        <button onClick={verifyMnemonic}>Verify</button>
      </header>
    </div>
  );
}

export default App;
