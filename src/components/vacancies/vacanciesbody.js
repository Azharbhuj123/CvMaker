import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import Select from "react-select";
import { RiShareBoxLine } from "react-icons/ri";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

const VacanciesBody = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [open, setOpen] = useState(false);
  const options = [{ value: "Nyeste", label: "Nyeste" }];
  let resizeWindow = () => {
    setWindowWidth(window.screen.width);
    setWindowHeight(window.screen.height);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  function onDismiss() {
    setOpen(false);
  }

  return (
    <>
      {windowWidth > 425 ? (
        <div className="vacanciesbody-container">
          <div className="vacanciesbody-container-wrapper">
            <div className="vacanciesbody-container-wrapper-leftside">
              <div>
                <h2>Sok blant ledige stillinger</h2>
                <div className="vacanciesbody-container-wrapper-leftside-inputfield">
                  <input placeholder="Sok" />
                  <BiSearch
                    size={25}
                    className="vacanciesbody-container-wrapper-leftside-inputfield-searchicon"
                  />
                </div>
              </div>
              <div>
                <h3>Omrade</h3>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <div className="vacanciesbody-container-wrapper-leftside-checkboxfield">
                    <input type="checkbox" />
                    <span>Flylke (antall jobber)</span>
                  </div>
                ))}
              </div>

              <div>
                <h3>Yrke</h3>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <div className="vacanciesbody-container-wrapper-leftside-checkboxfield">
                    <input type="checkbox" />
                    <span>Yrke/sektor (antall jobber)</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="vacanciesbody-container-wrapper-rightside">
              <div className="vacanciesbody-container-wrapper-rightside-wrapper">
                <h2>Viser 2 stillinger i 24504 annonser</h2>
                <div className="vacanciesbody-container-wrapper-rightside-wrapper-dropDown">
                  <span>Sorter:</span>
                  <Select
                    className="vacanciesbody-container-wrapper-rightside-wrapper-dropDown-items"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
              </div>
              <div className="vacanciesbody-container-wrapper-rightside-jobpost">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div className="vacanciesbody-container-wrapper-rightside-jobpost-data">
                    <h1>
                      Har du lyst til å bli med på en spennende reise i et solid, innovativt og
                      globalt selskap?
                    </h1>
                    <h2>Service Sales Admin / adm.koordinator</h2>
                    <h3>KONE AS</h3>
                    <h4>Oslo</h4>
                    <h5>Søknadsfrist: 12.04.2022</h5>
                    <h6>Publisert: 31.03.2022</h6>
                    <div className="vacanciesbody-container-wrapper-rightside-jobpost-data-share">
                      <span>Åpne annonsen</span>
                      <RiShareBoxLine style={{ color: "#EEB856" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="vacanciesbody-container">
          <div className="vacanciesbody-container-wrapper">
            {/* <div className='vacanciesbody-container-wrapper-leftside'>
        <h2>Sok blant ledige stillinger</h2>
        <div className='vacanciesbody-container-wrapper-leftside-inputfield'>
        <input placeholder="Sok" />
        <BiSearch size={25} className='vacanciesbody-container-wrapper-leftside-inputfield-searchicon' />
        </div>
      
        <h3>Omrade</h3>
         {
           [1,2,3,4,5,6,7,8,9].map(item => (
            <div className='vacanciesbody-container-wrapper-leftside-checkboxfield'>
            <input type="checkbox" />
            <span>Flylke (antall jobber)</span>
          </div>
           ))
         }

      <h3>Yrke</h3>
         {
           [1,2,3,4,5,6,7,8,9].map(item => (
            <div className='vacanciesbody-container-wrapper-leftside-checkboxfield'>
            <input type="checkbox" />
            <span>Yrke/sektor (antall jobber)</span>
          </div>
           ))
         }
        
        

      </div> */}
            <div className="vacanciesbody-container-wrapper-rightside">
              <div className="vacanciesbody-container-wrapper-rightside-wrapper">
                <h2>Viser 2 stillinger i 24504 annonser</h2>
                <div className="vacanciesbody-container-wrapper-rightside-wrapper-dropDown">
                  <span>Sorter:</span>
                  <Select
                    className="vacanciesbody-container-wrapper-rightside-wrapper-dropDown-items"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
              </div>
              <div
                className="vacanciesbody-container-wrapper-rightside-divwow"
                style={{ width: "100%" }}
              >
                <h6 onClick={() => setOpen(true)}>Filtrer søket</h6>
                <BottomSheet
                  open={open}
                  onDismiss={onDismiss}
                  snapPoints={({ minHeight }) => windowHeight / 0.5}
                >
                  <div className="vacanciesbody-container-wrapper-leftside">
                    <div>
                      <h2>Sok blant ledige stillinger</h2>
                      <div className="vacanciesbody-container-wrapper-leftside-inputfield">
                        <input placeholder="Sok" />
                        <BiSearch
                          size={25}
                          className="vacanciesbody-container-wrapper-leftside-inputfield-searchicon"
                        />
                      </div>
                    </div>

                    <div>
                      <h3>Omraasdasdde</h3>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                        <div className="vacanciesbody-container-wrapper-leftside-checkboxfield">
                          <input type="checkbox" />
                          <span>Flylke (antall jobber)</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3>Yrke</h3>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                        <div className="vacanciesbody-container-wrapper-leftside-checkboxfield">
                          <input type="checkbox" />
                          <span>Yrke/sektor (antall jobber)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </BottomSheet>
              </div>
              <div className="vacanciesbody-container-wrapper-rightside-jobpost">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div className="vacanciesbody-container-wrapper-rightside-jobpost-data">
                    <h1>
                      Har du lyst til å bli med på en spennende reise i et solid, innovativt og
                      globalt selskap?
                    </h1>
                    <h2>Service Sales Admin / adm.koordinator</h2>
                    <h3>KONE AS</h3>
                    <h4>Oslo</h4>
                    <h5>Søknadsfrist: 12.04.2022</h5>
                    <h6>Publisert: 31.03.2022</h6>
                    <div className="vacanciesbody-container-wrapper-rightside-jobpost-data-share">
                      <span>Åpne annonsen</span>
                      <RiShareBoxLine style={{ color: "#EEB856" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VacanciesBody;
