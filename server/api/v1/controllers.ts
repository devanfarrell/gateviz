import express from 'express';
import circuitList from '../../circuit-data/list.json';
import circuitExample from '../../circuit-data/vq8ev7ga.json';

export const getOneCircuit = (req:express.Request, res:express.Response) => {
    res.send(circuitExample);
}

export const getByCircuitId = (req:express.Request, res:express.Response) => {
    if(require(`../../circuit-data/${req.params.circuitId}.json`)) {
      res.send(require(`../../circuit-data/${req.params.circuitId}.json`));
    } else {
      res.send(404);
    }
};

// Eventual database call
// export const getByCircuitId = function (req:express.Request, res:express.Response, next:Function, id:String) {
//     Circuit.findOne({_id: id}, (err, circuit:JSON) {
//       if (err) {
//         next(err);
//       } else {
//         req.user = user;
//         next();
//       }
//     });
// };

export const getCircuitList = (req:any, res:any) => {
    res.send(circuitList);
}

export const getCircuitExample = (req:any, res:any) => {
  res.send(circuitExample);
}