const circuitExample = require('../../circuit-data/vq8ev7ga.json');
const circuitList = require('../../circuit-data/list.json');

function getCircuitExample() {
    return circuitExample;
}

function getCircuitList(){

}

module.exports = (API_VERSION, router) => {




router.route(`${API_VERSION}/circuits/:circuitId`)
    .get(getCircuit);

router.param('circuitId', getCircuitExample);

router.route(`${API_VERSION}/circuits`)
  .get(circuitList);





}