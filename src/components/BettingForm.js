import React, { useContext, useState } from "react";
import axios from "axios";
import LoadingOverlay from "./Loading";
import { CombinationContext } from "../context/ResultOfFirstMatch";
import { useViewableSites } from "../context/ViewableSitesContext";

function BettingForm({ sites, setSite }) {
  const { updateCombinationData } = useContext(CombinationContext);
  const { setViewableSites } = useViewableSites();
  const [viewedSites, setViewedSites] = useState(sites);
  const [loading, setLoading] = useState(false);
  const parseOddsValue = (value) => {
    // Erstat kommaer med punkter og fjern andre ugyldige tegn
    const cleanValue = value.replace(/,/g, ".").replace(/[^\d.]/g, "");
    // Parse den rensede streng som et flydende punktstal
    return parseFloat(cleanValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const groupedData = {};
    const resultsArray = [];

    new FormData(event.target).forEach((value, key) => {
      const [prefix, suffix] = key.split("-");

      if (!groupedData[prefix]) {
        groupedData[prefix] = { name: prefix };
      }

      groupedData[prefix][suffix] = parseOddsValue(value);
    });

    // Omform data til et array af objekter
    for (const group of Object.entries(groupedData)) {
      const [data] = group;

      console.log(group);
      const result = {
        name: data,
        homeWin:
          group[1]["1"] * sites?.find((name) => data === name.siteName)?.price,
        draw:
          group[1]["x"] * sites?.find((name) => data === name.siteName)?.price,
        awayWin:
          group[1]["2"] * sites?.find((name) => data === name.siteName)?.price,
        money: sites?.find((name) => data === name.siteName)?.price,
      };
      resultsArray.push(result);
    }
    console.log(resultsArray);
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/bet", {
        params: {
          data: resultsArray,
        },
      });

      const responseData = await response;

      updateCombinationData(responseData.data.message);
      setLoading(false);
      console.log(responseData.data.message);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  function removeSite(index) {
    console.log(index);
    const newSites = [
      ...viewedSites?.slice(0, index),
      ...viewedSites?.slice(index + 1),
    ];
    console.log(newSites);
    setViewableSites(newSites);
    setViewedSites(newSites);
  }

  return (
    <>
      {loading ? <LoadingOverlay /> : null}
      <form onSubmit={handleSubmit} style={{ maxWidth: "250px" }}>
        {viewedSites?.map((site, index) => (
          <div
            style={{
              display: "flex",
              paddingBottom: "1em",
              paddingTop: "1em",
              borderBottom: "2px solid white",
            }}
            key={site?.siteName}
          >
            <label style={{ width: "90px" }} htmlFor={site?.siteName}>
              {site?.siteName}
            </label>
            <div>
              {["1", "x", "2"].map((type) => (
                <>
                  <label htmlFor="top">{type}</label>
                  <input
                    key={type}
                    style={{ maxWidth: "25px", textAlign: "center", flex: "1" }}
                    type="text"
                    id={`${site?.siteName}-${type}`}
                    name={`${site?.siteName}-${type}`}
                    /* value={bet[type]} */
                  />
                </>
              ))}
              <p
                style={{
                  cursor: "pointer",
                  backgroundColor: "red",
                  textAlign: "center",
                  borderRadius: "5px",
                }}
                onClick={() => removeSite(index)}
              >
                Fjern side
              </p>
            </div>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default BettingForm;
