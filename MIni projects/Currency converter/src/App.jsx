import { useState } from 'react';
import usecurrencyinfo from './Hooks/currencyhook';
import InputBox from './components/Inputbox';

function App() {

  const [Amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");

  let data = usecurrencyinfo(from);
  const Options = Object.keys(data);

  const convert = () => {
    setConvertedAmount(Amount * data[to]);
  };

  const swapCurrencies = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${"https://c.pxhere.com/photos/59/89/apple_art_black_black_wallpaper_creative_creativity_fruit_glass-912907.jpg!d"}')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                Options={Options}
                Amount={Amount}
                Onamountch={(val) => setAmount(val)}
                currency={from}
                Onoptionch={(val) => setFrom(val)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swapCurrencies}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                Options={Options}
                Amount={convertedAmount}
                currency={to}
                Onoptionch={(val) => setTo(val)}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
