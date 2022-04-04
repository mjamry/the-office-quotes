/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';

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

  const getData = () => {
    fetch('/office').then(async (rawResponse: any) => {
      const data: ResponseData = await rawResponse.json();

      setState(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="characterHeaderContainer">
          <div className="characterHeader">
            {state.characterId}
          </div>
        </div>
        <div className="quote">
          {state.quote}
        </div>
        <div className="characterName">
          {state.character}
        </div>
      </div>
      <div
        className="button"
        onClick={() => getData()}
      >
        Shuffle
      </div>
    </div>
  );
}

export default QuotePage;
