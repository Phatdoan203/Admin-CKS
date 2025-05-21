import { Request, Response } from "express";
import { getPaginatedContracts, searchContract, getPaginatedContractDocs } from "../service/contracts.service";


export const getContracts = async (req : Request, res: Response) : Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const query = String(req.query.q ?? '').trim();
        const result = await getPaginatedContracts(page, limit, query);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching contracts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMe = async (req: Request, res: Response) : Promise<void> => {
    try {
        res.status(200).send('Welcome, User')
    } catch(error) {
        console.error("Error fetching contracts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getContractDocs = async (req : Request, res : Response) : Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const query = String(req.query.q ?? '').trim();    
        const result = await getPaginatedContractDocs(page, limit, query);
        res.status(200).json(result)
    } catch (error) {
        console.error("Error fetching : ", error);
        res.status(500).json({ message: "Internal Server Error" })
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