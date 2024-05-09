import React, { useContext, useState } from "react";
import { CombinationContext } from "../context/ResultOfFirstMatch";
import { useViewableSites } from "../context/ViewableSitesContext";
import { formatNumber } from "./cleanNumbers";
import OddsKamp2 from "./OddsKamp2";

export default function ResultMatch1() {
  const { combinationData, updateCombinationData } =
    useContext(CombinationContext);

  const { viewableSites, setViewableSites } = useViewableSites();
  const [resultOfMatch, setResultOfMatch] = useState(null);
  function winningTeam(e) {
    setResultOfMatch(e.target.value);
  }

  function setWinningTeam(res, index) {
    const siteIndex = viewableSites[index]?.siteName;
    /*  console.log(siteIndex + " skal være lig med " + res); */

    const findSite = viewableSites.find((site) => site.siteName === siteIndex);

    if (resultOfMatch === "1" && res === "1") {
      console.log("Hjemmehold vinder");
    } else if (resultOfMatch === "x" && res === "X") {
      console.log("Uafgjort");
    }
    if (resultOfMatch === "2" && res === "2") {
      console.log("Udehold vinder");
    }

    console.log(findSite);
  }
  return (
    <div style={{ display: "flex" }}>
      <div>
        <h2>Resultat af kamp 1</h2>
        <form
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "250px",
          }}
          onChange={(e) => winningTeam(e)}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="Hjemmehold">Hjemmehold</label>
            <input
              type="radio"
              name="winningTeam"
              value={"1"}
              id="winningTeam"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="uafgjort">Uafgjort</label>
            <input
              type="radio"
              name="winningTeam"
              value={"x"}
              id="winningTeam"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="udehold">udehold</label>
            <input
              type="radio"
              name="winningTeam"
              value={"2"}
              id="winningTeam"
            />
          </div>
        </form>

        <div>
          <table className="resultGrid">
            <tbody>
              <th style={{ borderBottom: "1px white solid" }}>
                <td>side</td>
              </th>
              <th style={{ borderBottom: "1px white solid" }}>
                <td>Hjemme</td>
              </th>
              <th style={{ borderBottom: "1px white solid" }}>
                <td>Uafgjort</td>
              </th>
              <th style={{ borderBottom: "1px white solid" }}>
                <td style={{ textAlign: "center" }}>Ude</td>
              </th>
              {combinationData?.best_combination?.map((res, index) => {
                setWinningTeam(res, index);

                return (
                  <tr
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <td
                      style={{
                        textAlign: "left",
                        borderRight: "1px white solid",

                        borderBottom: "1px white solid",
                      }}
                    >
                      {viewableSites[index]?.siteName}
                    </td>
                    <td
                      style={{
                        borderRight: "1px white solid",
                        borderBottom: "1px white solid",
                        backgroundColor:
                          resultOfMatch === "1" ? "green" : "transparent",
                      }}
                    >
                      {res === "1" ? res : null}
                    </td>
                    <td
                      style={{
                        borderRight: "1px white solid",
                        borderBottom: "1px white solid",
                        backgroundColor:
                          resultOfMatch === "x" ? "green" : "transparent",
                      }}
                    >
                      {res === "X" ? res : null}
                    </td>
                    <td
                      style={{
                        borderRight: "1px white solid",
                        borderBottom: "1px white solid",
                        backgroundColor:
                          resultOfMatch === "2" ? "green" : "transparent",
                      }}
                    >
                      {res === "2" ? res : null}
                    </td>
                  </tr>
                );
              })}
              <tr style={{ textAlign: "center" }}>
                <td style={{ textAlign: "left" }}>Total</td>
                {combinationData?.returns_per_outcome?.map((res, index) => {
                  return (
                    <td style={{ borderRight: "1px white solid" }}>
                      {formatNumber(res)} kr.
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>

          <p>Minimum {formatNumber(combinationData?.min_return)} kr.</p>
        </div>
      </div>

      <div>
        <OddsKamp2 resultOfMatch={resultOfMatch} />
      </div>
    </div>
  );
}
