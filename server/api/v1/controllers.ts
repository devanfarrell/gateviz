import circuitList from '../../circuit-data/list.json';
import circuitExample from '../../circuit-data/vq8ev7ga.json'

export const getOneCircuit = (req, res) => {
    res.send(circuitExample);
}

export const getByCircuitId = function (req, res, next, id) {
    // Circuit.findOne({_id: id}, function (err, user) {
    //   if (err) {
    //     next(err);
    //   } else {
    //     req.user = user;
    //     next();
    //   }
    // });
};

export const getCircuitList = (req, res) => {
    res.send(circuitList);
}
