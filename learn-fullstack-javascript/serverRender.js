import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

import config from './config';
import App from './src/components/App';

const getApiUrl = (contestId) => {
  if (contestId) return `${config.serverUrl}/api/contests/${contestId}`;
  return `${config.serverUrl}/api/contests`;
};

const getInitialData = (contestId, apiData) => {
  if (contestId) {
    return {
      currentContestId : apiData._id,
      contests         : {
        [apiData._id]: apiData
      }
    };
  }
  return {
    contests : apiData.contests
  };
};

const serverRender = async (contestId) => {
  const { data } = await axios.get(getApiUrl(contestId));
  const initialData = getInitialData(contestId, data);
  return {
    initialMarkup : ReactDOMServer.renderToString(<App initialData={initialData} />),
    initialData
  };
};

// const serverRender = (contestId) =>
//   axios.get(getApiUrl(contestId)).then(({ data }) => {
//     const initialData = getInitialData(contestId, data);
//     return {
//       initialMarkup : ReactDOMServer.renderToString(<App initialData={initialData} />),
//       initialData
//     };
//   });

export default serverRender;
