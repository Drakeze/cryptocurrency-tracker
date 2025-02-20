'use client'
import './globals.css';
import Calculator from './Calculator';
import { useState, useEffect  } from 'react'        // When using state
// import { useCallback } from 'react'     // When using callbacks
// import Image from 'next/image'          // When using Next.js images
// import Link from 'next/link'           // When using Next.js links
//import Layout from './layout';
// Update your CryptoData interface to match the API response
interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  current_price: number;
  market_cap: number;
  total_supply: number;
}

const Home: React.FC = () => {
  const [cryptoList, setCryptoList] = useState<CryptoData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        
        const data = await response.json();
        setCryptoList(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching cryptocurrency data');
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []); // Empty dependency array means this runs once when component mounts

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Format market cap number
  const formatMarketCap = (marketCap: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(marketCap);
  };

const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
const [isCalculatorVisible, setIsCalculatorVisible] = useState<boolean>(false);

const toggleTheme = () => {
setIsDarkMode(!isDarkMode);
document.body.classList.toggle('dark-mode');
};

return (
    <div className={`min-h-screen ${isDarkMode ? 'dark-mode' : ''}`}>
    <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
        <div className="title">
        <h1>Crypto Currency Tracker</h1>
            </div>
            <div className="theme-toggle-container">
                <div className="theme-toggle flex gap-2">
                <button onClick={toggleTheme} className="theme-button">
                    {isDarkMode ? (
                    <svg className="theme-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    ) : (
                    <svg className="theme-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    )}
                </button>
                <button onClick={() => setIsCalculatorVisible(!isCalculatorVisible)} className="theme-button">
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2h12v3H6V8zm0 5h3v2H6v-2zm5 0h3v2h-3v-2zm5 0h3v2h-3v-2zm-10 4h3v2H6v-2zm5 0h3v2h-3v-2zm5 0h3v2h-3v-2z"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                </button>
                </div>
            </div>

            {/* Search input */}
            <input 
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Find your Crypto Currency"
            />

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && (
        //Add a table to display the cryptocurrency data
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market Cap</th>
              <th>Price</th>
              <th>Available Supply</th>
            </tr>
          </thead>
          <tbody>
            {cryptoList
              .filter(crypto => 
                crypto.name.toLowerCase().includes(search.toLowerCase()) ||
                crypto.symbol.toLowerCase().includes(search.toLowerCase())
              )
              .map((crypto) => (
                <tr key={crypto.id}>
                  <td>{crypto.market_cap_rank}</td>
                  <td>{crypto.name}</td>
                  <td>{crypto.symbol.toUpperCase()}</td>
                  <td>{formatMarketCap(crypto.market_cap)}</td>
                  <td>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(crypto.current_price)}
                  </td>
                  <td>
                    {new Intl.NumberFormat('en-US').format(crypto.total_supply)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
    )}
    </div>
    {isCalculatorVisible && (
    <div className="w-full lg:w-96 p-4 border-l border-gray-200 dark:border-gray-700">
        <Calculator />
    </div>
    )}
</div>
</div>
);
}
export default Home;
