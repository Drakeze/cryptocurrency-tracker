'use client'
// Imports That I might need 
import './globals.css';
import { useState, useEffect  } from 'react'        // When using state
// import { useCallback } from 'react'     // When using callbacks
// import Image from 'next/image'          // When using Next.js images
// import Link from 'next/link'           // When using Next.js links
//import layout from 'layout./layout.tsx';
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

  return (
    <main>
      <div className="title">
        <h1>Cryptocurrency Tracker</h1>
      </div>

      {//The search input}
}
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
    </main>
  );
};

export default Home;
