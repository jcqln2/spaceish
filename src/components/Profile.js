import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './Profile.css';

const Profile = () => {
  const [walletAddress] = useState('0xC354BE3a1bB1049296549925CDD7Cf5E54b2e2c7');
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const networkAddresses = {
    ethereum: '0xC354BE3a1bB1049296549925CDD7Cf5E54b2e2c7',
    polygon: '0xC354BE3a1bB1049296549925CDD7Cf5E54b2e2c7',
    solana: 'YourSolanaAddressHere', // Replace with a valid Solana address
    lukso: '0xC354BE3a1bB1049296549925CDD7Cf5E54b2e2c7',
    bitcoin: 'YourBitcoinAddressHere', // Replace with a valid Bitcoin address
  };

  const getPaymentUri = (network) => {
    const address = networkAddresses[network] || walletAddress;
    const amounts = {
      ethereum: 0.0015, // ~$5 at $3,300/ETH
      polygon: 0.12,    // ~$5 at $40/MATIC
      solana: 0.007,    // ~$5 at $700/SOL
      lukso: 0.0015,    // Assuming similar to ETH, verify
      bitcoin: 0.0001,  // ~$5 at $50,000/BTC
    };
    const amount = amounts[network] || 0.0015;
    switch (network) {
      case 'ethereum':
        return `ethereum:${address}?value=${amount}&chainId=1`; // Ethereum Mainnet
      case 'polygon':
        return `polygon:${address}?value=${amount}&chainId=137`; // Polygon Mainnet
      case 'lukso':
        return `lukso:${address}?value=${amount}&chainId=4201`; // Lukso Testnet (verify mainnet chain ID)
      case 'solana':
        return `solana:${address}?amount=${amount}`; // Solana doesn't use chainId in URI
      case 'bitcoin':
        return `bitcoin:${address}?amount=${amount}`; // Bitcoin doesn't use chainId in URI
      default:
        return `ethereum:${address}?value=${amount}&chainId=1`;
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(networkAddresses[selectedNetwork]);
    alert('Wallet address copied!');
  };

  return (
    <div className="profile">
      <div className="header">
        <img src="pfp.jpg" alt="Profile Pic" />
        <h1>Zenon's Profile</h1>
        <p>Orbiting the Cosmos • Online Now</p>
      </div>
      <div className="bio">
        <h2>About Me</h2>
        <p>Hey, I'm Zenon, your galactic fren! Zooming through the next wave of anonymous internet with neon vibes and cosmic dreams. Send me some stardust to keep the vibes going!</p>
      </div>
      <div className="receive">
        <h2>Send me some love to support my avocado toast habit</h2>
        <div>
          <label htmlFor="network-select">Choose Network: </label>
          <select id="network-select" value={selectedNetwork} onChange={(e) => setSelectedNetwork(e.target.value)}>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="solana">Solana</option>
            <option value="lukso">Lukso</option>
            <option value="bitcoin">Bitcoin</option>
          </select>
        </div>
        <p>Scan to send $5 crypto to: <span id="wallet-address">{networkAddresses[selectedNetwork]}</span></p>
        <QRCodeSVG id="wallet-qr" value={getPaymentUri(selectedNetwork)} size={150} />
        <p>Secure identity via ERC-725. Receiving only—keep it cosmic! <strong>Note:</strong> Add the network in your wallet (e.g., Ethereum: Chain ID 1, Polygon: Chain ID 137) if not found.</p>
        <button className="tip-button" onClick={copyAddress}>Copy Wallet Address</button>
      </div>
      <div className="friends">
        <h2>Stellar Squad</h2>
        <ul>
          <li><img src="https://via.placeholder.com/60?text=Proto" alt="Friend1" /></li>
          <li><img src="https://via.placeholder.com/60?text=Nebula" alt="Friend2" /></li>
          <li><img src="https://via.placeholder.com/60?text=Orbit" alt="Friend3" /></li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;