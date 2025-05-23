import { Router } from 'express';
import { getContractDocs, getContracts, getMe, searchContractController} from '../controller/contracts.controller';
import { verifyToken } from '../middleware/Authenticate';

const router = Router();

router.get('/Contract', verifyToken , getContracts);
router.get('/ContractDocument',verifyToken, getContractDocs);
// router.get('/seacrh/contract/mcas/:mcasNumber', getContractByMcasNumberControlller);
// router.get('/search/contract/number/:contractNumber', getContractByContractNumberController);
// router.get('/search/contract/cif/:cif', getContractByCifController);
// router.get('/search/contract/mobile/:mobile', getContractByPhoneController);
router.get('/searchContract', verifyToken ,searchContractController);
router.get('/getMe', verifyToken, getMe)

export default router;