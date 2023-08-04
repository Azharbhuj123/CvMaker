import React from "react";
import { Link } from "react-router-dom";
import CheckIcon from "../../assests/images/checkIcon.png";

const Illustration = () => {
  return (
    <div className="cvm-container">
      <div
        className="cvm-container-wrapper"
        style={{ justifyContent: "center" }}
      >
        <div className="cvm-container-wrapper-heading">
          {/* <h6>Illustration</h6> */}
          <h1>Cv hjelperen kan hjelpe deg å finne drømmejobben</h1>
          <span>
            Vi har ledige stillinger som passer for deg uavhengig av hvor du er
            i karrieren eller hvor langt du ønsker å nå
          </span>
          {/* <div>
            <span style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: "15px" }}>
                <img
                  style={{ height: "1.5rem", width: "25px" }}
                  src={CheckIcon}
                ></img>
                <h4> Ledige stillinger:</h4>
                <span style={{ width: "50" }}>
                  Vi har samlet ledige stillinger for deg
                </span>
              </div>
              <div style={{ display: "flex", gap: "15px" }}>
                <img
                  style={{ height: "1.5rem", width: "25px" }}
                  src={CheckIcon}
                ></img>
                <h4>Rask oversikt: </h4>
                <span style={{ width: "50" }}>
                  Sorter og filtrer for å finne drømmejobben
                </span>
              </div>
              <div style={{ display: "flex", gap: "15px" }}>
                <img
                  style={{ height: "1.5rem", width: "25px" }}
                  src={CheckIcon}
                ></img>
                <h4>Profesjonell hjelp:</h4>
                <span style={{ width: "50" }}>
                  Våre rekrutteringsrådgivere kan veilede deg
                </span>
              </div>
              <div style={{ display: "flex", gap: "15px" }}>
                <img
                  style={{ height: "1.5rem", width: "25px" }}
                  src={CheckIcon}
                ></img>
                <h4>Blogginnlegg:</h4>
                <span style={{ width: "50" }}>
                  Vi har laget en rekke artikler om tips til jobbsøking
                </span>
              </div>
            </span>
          </div> */}

          {window.innerWidth > 1024 ? (
            <div>
              <div style={{ display: "flex", flex: 1, gap: "1rem" }}>
                <img
                  style={{ height: "1.5rem", width: 30 }}
                  src={CheckIcon}
                ></img>
                <h4 style={{ flex: 0.2 }}>Ledige stillinger:</h4>
                <span style={{ flex: 0.8, marginTop: "-.3rem" }}>
                  Vi har samlet ledige stillinger for deg
                </span>
              </div>
              <div
                style={{ display: "flex", flex: 1, gap: "1rem", marginTop: 15 }}
              >
                <img
                  style={{ height: "1.5rem", width: 30 }}
                  src={CheckIcon}
                ></img>
                <h4 style={{ flex: 0.2 }}>Rask oversikt:</h4>
                <span style={{ flex: 0.8, marginTop: "-.3rem" }}>
                  Sorter og filtrer for å finne drømmejobben
                </span>
              </div>
              <div
                style={{ display: "flex", flex: 1, gap: "1rem", marginTop: 15 }}
              >
                <img
                  style={{ height: "1.5rem", width: 30 }}
                  src={CheckIcon}
                ></img>
                <h4 style={{ flex: 0.2 }}>Profesjonell hjelp:</h4>
                <span style={{ flex: 0.8, marginTop: "-.3rem" }}>
                  Våre rekrutteringsrådgivere kan veilede deg
                </span>
              </div>
              <div
                style={{ display: "flex", flex: 1, gap: "1rem", marginTop: 15 }}
              >
                <img
                  style={{ height: "1.5rem", width: 30 }}
                  src={CheckIcon}
                ></img>
                <h4 style={{ flex: 0.2 }}>Blogginnlegg:</h4>
                <span style={{ flex: 0.8, marginTop: "-.3rem" }}>
                  Vi har laget en rekke artikler om tips til jobbsøking
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ height: "1.5rem", width: 30 }}
                  src={CheckIcon}
                ></img>
                <div>
                  <h3 style={{ flex: 1 }}>Blogginnlegg:</h3>
                  <span style={{ flex: 1 }}>
                    Vi har laget en rekke artikler om tips til jobbsøking
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  gap: "1rem",
                  marginTop: 15,
                  alignItems: "center",
                }}
              >
                <img
                  style={{ height: "1.5rem", width: 30 }}
                  src={CheckIcon}
                ></img>
                <div>
                  <h3 style={{ flex: 1 }}>Rask oversikt:</h3>
                  <span style={{ flex: 1 }}>
                    Sorter og filtrer for å finne drømmejobben
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flex: 1,
                  gap: "1rem",
                  marginTop: 15,
                  alignItems: "center",
                }}
              >
                <img
                  style={{ height: "1.5rem", width: 30 }}
                  src={CheckIcon}
                ></img>
                <div>
                  <h3 style={{ flex: 1 }}>Profesjonell hjelp:</h3>
                  <span style={{ flex: 1 }}>
                    Våre rekrutteringsrådgivere kan veilede deg
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="cvm-container-wrapper-heading-btn">
            <a href="https://karrieresenteret.recman.no/" target="_blank">
              <button>Ledige stillinger</button>
            </a>
            <Link to="/maler">
              <button
                style={{
                  paddingLeft: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "10px",
                }}
              >
                Lag gratis CV
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Illustration;
