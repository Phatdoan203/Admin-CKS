import { Router } from 'express';
import { getContracts, getContractByCifController, getContractByContractNumberController, getContractByMcasNumberControlller, getContractByPhoneController, searchContractController } from '../controller/contracts.controller';

const router = Router();

router.get('/allContract', getContracts);
router.get('/seacrh/contract/mcas/:mcasNumber', getContractByMcasNumberControlller);
router.get('/search/contract/number/:contractNumber', getContractByContractNumberController);
router.get('/search/contract/cif/:cif', getContractByCifController);
router.get('/search/contract/mobile/:mobile', getContractByPhoneController);
router.get('/searchContract', searchContractController);

export default router;