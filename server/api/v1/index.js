

function getCircuitExample() {
    return circuitExample;
}


module.exports = (API_VERSION, router) => {


    const getByCircuitId = require('./controllers').getByCircuitId;
    const getOneCircuit = require('./controllers').getOneCircuit;
    router.route(`${API_VERSION}/circuit/:circuitId`)
        .get(getOneCircuit);
    router.param('circuitId', getByCircuitId);
    

    const getCircuitList = require('./controllers').getCircuitList;
    router.route(`${API_VERSION}/circuit`)
        .get(getCircuitList);

}