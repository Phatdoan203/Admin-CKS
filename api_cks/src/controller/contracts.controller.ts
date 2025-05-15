import { Request, Response } from "express";
import { getPaginatedContracts, getContractByMcasNumber, getContractByContracNumber, getContractByCif, getContractByMobile, searchContract } from "../service/contracts.service";


export const getContracts = async (req : Request, res: Response) : Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await getPaginatedContracts(page, limit);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching contracts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getContractByContractNumberController = async (req : Request, res: Response) : Promise<void> => {
    try {
        const contractNumber = req.params.contractNumber;
        if (!contractNumber || contractNumber.trim() === "") {
            res.status(400).json({ message: "Contract number is required" });
            return;
        }
        const contract = await getContractByContracNumber(contractNumber);
        if (!contract) {
            res.status(404).json({ message: "Contract not found" });
            return;
        }
        res.status(200).json(contract);
    } catch (error) {
        console.error("Error fetching contract by contract number:", error);
        res.status(500).json({ message: "Internal server error" });
    }
} 


export const getContractByMcasNumberControlller = async (req : Request, res: Response) : Promise<void> => {
    try {
        const mcasNumber = req.params.mcasNumber;
        if (!mcasNumber || mcasNumber.trim() === "") {
            res.status(400).json({ message: "MCAS number is required" });
            return;
        }
        const contract = await getContractByMcasNumber(mcasNumber);
        if (!contract) {
            res.status(404).json({ message: "Contract not found" });
            return;
        }
        res.status(200).json(contract);
    } catch (error) {
        console.error("Error fetching contract by MCAS number:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getContractByCifController = async (req : Request, res: Response) : Promise<void> => {
    try {
        const cif = req.params.cif;
        if (!cif || cif.trim() === "") {
            res.status(400).json({ message: "CIF is required" });
            return;
        }
        const contract = await getContractByCif(cif);
        if (!contract) {
            res.status(404).json({ message: "Contract not found" });
            return;
        }
        res.status(200).json(contract);
    } catch (error) {
        console.error("Error fetching contract by CIF:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getContractByPhoneController = async (req : Request, res: Response) : Promise<void> => {
    try {
        const mobile = req.params.mobile;
        if (!mobile || mobile.trim() === "") {
            res.status(400).json({ message: "Mobile number is required" });
            return;
        }
        const contract = await getContractByMobile(mobile);
        if (!contract) {
            res.status(404).json({ message: "Contract not found" });
            return;
        }
        res.status(200).json(contract);
    } catch (error) {
        console.error("Error fetching contract by mobile number:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const searchContractController = async (req : Request, res : Response) : Promise<void> => {
    try {
        const query = req.query.q?.toString() || '';
        const contracts = await searchContract(query);
        res.json(contracts)
    } catch (error) {
        console.error("Error fetching contract :", error);
        res.status(500).json({ message: "Internal server error" });
    }
}