import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';

import config from '../config';

const router = express.Router();

const client = new MongoClient(config.mongodbUri, { useNewUrlParser: true });

let mdb;
client.connect((err) => {
  assert.equal(null, err);
  mdb = client.db('test');
});

router.get('/contests', async (req, res) => {
  let contests = {};
  try {
    const collection = mdb.collection('contests');
    const data = await collection
      .find({})
      .project({
        categoryName : 1,
        contestName  : 1
      })
      .toArray();
    data.forEach((contest) => {
      contests[contest._id] = contest;
    });
  } catch (error) {
    console.log(error);
  }
  res.send({ contests });
});

router.get('/contests/:contestId', async (req, res) => {
  // req.params.contestId
  let contest = {};
  try {
    const collection = mdb.collection('contests');
    contest = await collection.findOne({ _id: ObjectID(req.params.contestId) });
    res.send(contest);
  } catch (error) {
    console.error(error);
    res.status(404).send('bad request!');
  }
});

router.get('/names/:nameIds', async (req, res) => {
  const nameIds = req.params.nameIds.split(',').map(ObjectID);
  let names = {};
  try {
    const collection = mdb.collection('names');
    const data = await collection.find({ _id: { $in: nameIds } }).toArray();
    data.forEach((name) => {
      names[name._id] = name;
    });
  } catch (error) {
    console.log(error);
  }
  res.send({ names });
});

router.post('/names', async (req, res) => {
  const contestId = ObjectID(req.body.contestId);
  const name = req.body.newName;
  try {
    const insertedName = await mdb.collection('names').insertOne({ name });
    const updatedContest = await mdb.collection('contests').findAndModify(
      { _id: contestId },
      [],
      {
        $push : {
          nameIds : insertedName.insertedId
        }
      },
      {
        new : true
      }
    );
    res.send({ updatedContest: updatedContest.value, newName: { _id: insertedName.insertedId, name } });
  } catch (error) {
    console.error(error);
    res.status(404).send('bad request!');
  }
});

// import data from './testData.json';
// const contests = data.contests.reduce((acc, contest) => {
//   acc[contest.id] = contest;
//   return acc;
// }, {});

// router.get('/contests', (req, res) => {
//   res.send({
//     contests
//   });
// });

// router.get('/contests/:contestId', (req, res) => {
//   // req.params.contestId
//   let contest = contests[req.params.contestId];
//   contest.description =
// 		'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi ex recusandae quam, mollitia nisi laudantium repudiandae aspernatur accusantium ab ea vitae quas. Vel facere aperiam omnis deserunt optio id exercitationem!';
//   res.send(contest);
// });

export default router;

// my work around for update names _id
// router.get('/contests/update', async (req, res) => {
//   let contests = {};
//   try {
//     const collection = mdb.collection('contests');
//     const data = await collection.find({}).toArray();

//     data.forEach(async (contest) => {
//       const collection = mdb.collection('names');
//       const namesIds = await collection.find({ id: { $in: contest.nameIds } }).project({ _id: 1 }).toArray();
//       const newIds = namesIds.map((o) => o._id);

//       const collectionOne = mdb.collection('contests');
//       const updates = await collectionOne.updateOne({ id: contest.id }, { $set: { nameIds: newIds } });
//       console.log(updates);
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   res.send({});
// });
