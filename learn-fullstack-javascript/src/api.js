import axios from 'axios';

const fetchContest = (contestId) => {
  return axios.get(`/api/contests/${contestId}`).then((resp) => resp.data);
};

const fetchContestList = () => {
  return axios.get('/api/contests').then((resp) => resp.data.contests);
};

const fetchNames = async (nameIds) => {
  const { data } = await axios.get(`/api/names/${nameIds.join(',')}`);
  return data.names;
};

const addName = async (newName, contestId) => {
  const { data } = await axios.post('/api/names', {
    newName,
    contestId
  });
  return data;
};

export { fetchContest, fetchContestList, fetchNames, addName };
