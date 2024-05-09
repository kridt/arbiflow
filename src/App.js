import "./App.css";
import BettingForm from "./components/BettingForm";
import { useEffect, useState } from "react";
import ResultMatch1 from "./components/ResultMatch1";
import { ViewableSitesProvider } from "./context/ViewableSitesContext";

function App() {
  const [sites, setSites] = useState([
    { siteName: "spreadEx", price: 1000, freebet: true, won: false },
    { siteName: "tipwin", price: 1600, freebet: false, won: false },
    { siteName: "bet365", price: 1000, freebet: true, won: false },
    { siteName: "888sport", price: 500, freebet: true, won: false },
    { siteName: "bet25", price: 500, freebet: true, won: false },
    { siteName: "nordicbet", price: 500, freebet: true, won: false },
    { siteName: "betsson", price: 500, freebet: true, won: false },
    { siteName: "vBet", price: 500, freebet: true, won: false },
    { siteName: "expekt", price: 1000, freebet: true, won: false },
    { siteName: "Cashpoint", price: 500, freebet: true, won: false },
    { siteName: "Unibet", price: 2000, freebet: true, won: false },
    { siteName: "Leo Vegas", price: 1000, freebet: true, won: false },
    { siteName: "Betina", price: 500, freebet: true, won: false },
    { siteName: "CampoBet", price: 500, freebet: true, won: false },
    { siteName: "bwin", price: 1000, freebet: true, won: false },
    { siteName: "comeone", price: 1000, freebet: false, won: false },
  ]);

  return (
    <ViewableSitesProvider initialSites={sites}>
      <div className="App">
        <h1>App</h1>
        <div style={{ display: "flex" }}>
          <BettingForm sites={sites} setSites={setSites} />

          <ResultMatch1 />
        </div>

        {/*  <form style={{ maxWidth: "250px" }}>
        <label htmlFor="d">
        Intast odds her, check fra hvis du ikke bruger
        </label>
        
        {sites?.map((item) => {
          console.log(item);
          return (
            <div
            style={{
              display: "flex",
              paddingBottom: "1em",
              paddingTop: "1em",
              borderBottom: "2px solid white",
            }}
            key={item}
            >
            <label style={{ width: "90px" }} htmlFor={item}>
            {item}
            </label>
            <div>
            <input
            style={{ maxWidth: "25px", textAlign: "center", flex: "1" }}
            type="text"
            id={item}
            name={item + "-" + "1"}
            value={1}
            />
            <input
            style={{ maxWidth: "25px", textAlign: "center", flex: "1" }}
            type="text"
            id={item}
            name={item + "-" + "x"}
            value={"x"}
            />
            <input
            style={{ maxWidth: "25px", textAlign: "center", flex: "1" }}
            type="text"
            id={item}
            name={item + "-" + "2"}
            value={2}
            />
            </div>
            <input type="checkbox" id={item} name={item} value={item} />
            </div>
          );
        })}
      </form> */}
      </div>
    </ViewableSitesProvider>
  );
}

export default App;
