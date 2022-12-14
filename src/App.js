import "./App.css";
import {
  FormSection,
  Formular,
  InputDiv,
  MainTitle,
  PageContainer,
  SectionTitle,
  KontrolaButton,
} from "./AppStyles";
//
import { useReducer, useState, useEffect } from "react";
// initialState pro useReducer
const defaultObjednavka = {
  zapujcka: 0,
  doplnky: 0,
  horske: false,
  pocHor: 1,
  detske: false,
  pocDet: 1,
  silnicni: false,
  pocSil: 1,
  gravel: false,
  pocGra: 1,
  rozpocet: 0,
};
// reducer funkce pro useReducer
function setObjednavka(objednavka, action) {
  switch (action.type) {
    case "update_text":
      return { ...objednavka, [action.key]: action.value };
    case "update_number":
      return { ...objednavka, [action.key]: parseFloat(action.value) };
    case "toggle_horske":
      return { ...objednavka, horske: !objednavka.horske };
    case "toggle_detske":
      return { ...objednavka, detske: !objednavka.detske };
    case "toggle_silnicni":
      return { ...objednavka, silnicni: !objednavka.silnicni };
    case "toggle_gravel":
      return { ...objednavka, gravel: !objednavka.gravel };
    default:
      return objednavka;
  }
}

function App() {
  const [finalPrice, setFinalPrice] = useState(0);
  const [showFinalPrice, setShowFinalPrice] = useState(0);
  const [checked, setChecked] = useState();
  //state objednavky spravujeme pomoci useReducer hooku
  const [objednavka, dispatch] = useReducer(setObjednavka, defaultObjednavka);

  // useEffect
  useEffect(() => {
    // console.log(JSON.stringify(objednavka));
    let newFinalPrice = getFinalPrice(objednavka);
    setShowFinalPrice(newFinalPrice);
  }, [objednavka]);

  const getFinalPrice = (objednavka) => {
    let thisBasePrice = 0;
    let thisFinalPrice = thisBasePrice;

    if (objednavka.horske) {
      thisFinalPrice += objednavka.pocHor * 500;
    }
    if (objednavka.detske) {
      thisFinalPrice += objednavka.pocDet * 200;
    }
    if (objednavka.silnicni) {
      thisFinalPrice += objednavka.pocSil * 1200;
    }
    if (objednavka.gravel) {
      thisFinalPrice += objednavka.pocGra * 2000;
    }

    let newBasePrice = thisFinalPrice * objednavka.zapujcka;

    if (objednavka.doplnky === 0.05) {
      newBasePrice += newBasePrice * 0.05;
    } else if (objednavka.doplnky === 0.1) {
      newBasePrice += newBasePrice * 0.1;
    }

    setFinalPrice(newBasePrice);

    return newBasePrice;
  };

  const checkPrice = (objednavka) => {
    if (objednavka.rozpocet >= finalPrice) {
      let checkOk = 1;
      setChecked(checkOk);
    } else {
      let checkNotOk = 2;
      setChecked(checkNotOk);
    }
  };

  return (
    <PageContainer>
      <Formular>
        <FormSection name="nadpis">
          <MainTitle>Va??e objedn??vka</MainTitle>
        </FormSection>

        {/* V??b??r */}
        <FormSection name="vyber">
          <SectionTitle>V??b??r kola</SectionTitle>
          <InputDiv>
            <input
              type="checkbox"
              id="horske"
              onChange={(e) => {
                dispatch({
                  type: "toggle_horske",
                });
              }}
            />
            <input
              type="number"
              placeholder="po??et kol"
              id="pocHor"
              min="1"
              value={objednavka.pocHor}
              onChange={(e) => {
                dispatch({
                  type: "update_number",
                  value: e.target.value,
                  key: "pocHor",
                });
              }}
            ></input>
            <label>Horsk?? kolo (500 K??/den)</label>
          </InputDiv>
          <InputDiv>
            <input
              type="checkbox"
              id="detske"
              onChange={(e) => {
                dispatch({
                  type: "toggle_detske",
                });
              }}
            />
            <input
              type="number"
              placeholder="po??et kol"
              id="pocDet"
              min="1"
              value={objednavka.pocDet}
              onChange={(e) => {
                dispatch({
                  type: "update_number",
                  value: e.target.value,
                  key: "pocDet",
                });
              }}
            ></input>
            <label>D??tsk?? kolo (200 K??/den)</label>
          </InputDiv>
          <InputDiv>
            <input
              type="checkbox"
              id="silnicni"
              onChange={(e) => {
                dispatch({
                  type: "toggle_silnicni",
                });
              }}
            />
            <input
              type="number"
              placeholder="po??et kol"
              id="pocSil"
              min="1"
              value={objednavka.pocSil}
              onChange={(e) => {
                dispatch({
                  type: "update_number",
                  value: e.target.value,
                  key: "pocSil",
                });
              }}
            ></input>
            <label>Silni??n?? kolo (1 200 K??/den)</label>
          </InputDiv>
          <InputDiv>
            <input
              type="checkbox"
              id="gravel"
              onChange={() => {
                dispatch({
                  type: "toggle_gravel",
                });
              }}
            />
            <input
              type="number"
              placeholder="po??et kol"
              id="pocGra"
              min="1"
              value={objednavka.pocGra}
              onChange={(e) => {
                dispatch({
                  type: "update_number",
                  value: e.target.value,
                  key: "pocGra",
                });
              }}
            ></input>
            <label>Gravel (2 000 K??/den)</label>
          </InputDiv>
        </FormSection>
        <FormSection name="delkaZap">
          <SectionTitle>Doba zap??j??en??</SectionTitle>
          {/* Z??p??j??ka */}
          <label>V??b??r d??lku z??p??j??ky:</label>
          <select
            id="zapujcka"
            onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "zapujcka",
              });
            }}
          >
            <option value={0}>nevybr??no</option>
            <option value={1}>1 den</option>
            <option value={3}>3 dny</option>
            <option value={7}>7 dn??</option>
            <option value={14}>14 dn??</option>
          </select>
        </FormSection>
        <FormSection name="doplnky">
          {/* Dopl??ky */}
          <SectionTitle>Dopl??ky</SectionTitle>
          <div>
            <input
              type="radio"
              name="doplnky"
              id="dopravaFiremniKuryr"
              value={0.05}
              onChange={(e) => {
                dispatch({
                  type: "update_number",
                  value: e.target.value,
                  key: "doplnky",
                });
              }}
            />
            <label>Cyklonosi?? st??e??n?? (+5%)</label>
            <input
              type="radio"
              name="doplnky"
              id="dopravaCeskaPosta"
              value={0.1}
              onChange={(e) => {
                dispatch({
                  type: "update_number",
                  value: e.target.value,
                  key: "doplnky",
                });
              }}
            />
            <label>Cyklonosi?? na ta??n?? za????zen?? (+10%)</label>
            <input
              type="radio"
              name="doplnky"
              id="dopravaOdber"
              value={0}
              onChange={(e) => {
                dispatch({
                  type: "update_number",
                  value: e.target.value,
                  key: "doplnky",
                });
              }}
            />
            <label>Nen?? t??eba cyklonosi??</label>
          </div>
        </FormSection>
        <FormSection name="kalkulace">
          {/* FINALNI CENA - ZOBRAZENI + ROZPOCET */}
          <SectionTitle>Kone??n?? kalkulace</SectionTitle>

          <label>Fin??ln?? cena:</label>
          <input type="text" id="finalniCena" value={finalPrice} disabled />

          <label>Zadejte v???? rozpo??et:</label>
          <input
            type="text"
            id="rozpocet"
            value={objednavka.rozpocet}
            onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "rozpocet",
              });
            }}
          />
          <KontrolaButton
            checkedPrice={checked}
            onClick={() => {
              checkPrice(objednavka);
            }}
          >
            Bude sta??it rozpo??et? (zelen??: ano; ??erven?? ne)
          </KontrolaButton>
        </FormSection>
      </Formular>
    </PageContainer>
  );
}
export default App;
