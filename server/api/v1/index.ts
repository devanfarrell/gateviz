import express = require('express')
var router = express.Router()

import { getByCircuitId, getOneCircuit, getCircuitList, getCircuitExample } from './controllers';

const API_VERSION: String = '/v1';

// define what to do with parameter
router.get(`${API_VERSION}/circuit/:circuitId`, getByCircuitId)
router.get(`${API_VERSION}/test`, getCircuitExample)
router.get(`${API_VERSION}/circuits`, getCircuitList)

module.exports = router