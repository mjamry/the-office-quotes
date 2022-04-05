import React, { useEffect, useState } from 'react';
import michael from './assets/5e93b4a43af44260882e33b0.png';
import andy from './assets/5e93b5453af44260882e33b9.png';
import jim from './assets/5e93b4f03af44260882e33b1.png';
import angela from './assets/5e93b52b3af44260882e33b6.png';
import dwight from './assets/5e93b4fa3af44260882e33b2.png';
import pam from './assets/5e93b50a3af44260882e33b3.png';
import ryan from './assets/5e93b5183af44260882e33b4.png';
import erin from './assets/5e93b5653af44260882e33bd.png';
import kevin from './assets/5e93b5323af44260882e33b7.png';
import dice from './assets/dice.png';
import Loader from './Loader';

const characters = {
  '5e93b4a43af44260882e33b0': michael,
  '5e93b5453af44260882e33b9': andy,
  '5e93b4f03af44260882e33b1': jim,
  '5e93b52b3af44260882e33b6': angela,
  '5e93b4fa3af44260882e33b2': dwight,
  '5e93b50a3af44260882e33b3': pam,
  '5e93b5183af44260882e33b4': ryan,
  '5e93b5653af44260882e33bd': erin,
  '5e93b5323af44260882e33b7': kevin,
};

type ResponseData = {
  quote: string;
  character: string;
  characterId: string;
}

const emptyData: ResponseData = {
  quote: '',
  character: '',
  characterId: '',
};

function QuotePage() {
  const [state, setState] = useState<ResponseData>(emptyData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = () => {
    setIsLoading(true);
    fetch('/office').then(async (rawResponse: any) => {
      const data: ResponseData = await rawResponse.json();

      setState(data);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    isLoading
      ? <Loader />
      : (
        <div className="container">
          <div className="card">
            <div className="quote">
              {state.quote}
            </div>
            <div className="characterHeaderContainer">
              <div className="characterHeader">
                <img src={characters[state.characterId]} alt="" />
              </div>
            </div>
            <div className="characterNameContainer">
              <div className="characterName">
                {state.character}
              </div>
            </div>
          </div>
          <div
            className="button"
            onClick={() => getData()}
            onKeyDown={() => getData()}
            role="none"
          >
            <img src={dice} alt="" />
          </div>
        </div>
      )
  );
}

export default QuotePage;
