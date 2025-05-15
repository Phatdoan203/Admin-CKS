import { Op } from "sequelize";
import { Contracts } from "../models/Contracts";

export const getPaginatedContracts = async (page : number, limit : number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await Contracts.findAndCountAll({
        offset,
        limit,
        order: [['lastUpdated', 'DESC']],
    })

    const data = rows.map((item : any) => {
        const contract = item.toJSON();
        contract.actions =  JSON.parse(contract.actions || '[]');
        return contract;
    })

    return {
        currentPage : page,
        pageSize : limit,
        totalItems : count,
        totalPages : Math.ceil(count / limit),
        data
    };
};

export const getContractByContracNumber = async (contractNumber : string) => {
    const contract = await Contracts.findOne({
        where: {
            contractNumber
        }
    });
    return contract;
}

export const getContractByMcasNumber = async (mcasNumber : string) => {
    const contract = await Contracts.findOne({
        where: {
            mcasNumber
        }   
    });
    return contract;
}

export const getContractByCif = async (cif : string) => {
    const contract = await Contracts.findOne({
        where: {
            cif
        }
    });
    return contract;
}

export const getContractByMobile = async (mobile : string) => {
    const contract = await Contracts.findOne({
        where: {
            mobile
        }
    });
    return contract;
}

export const searchContract = async (query : string) => {
    if (!query) return `query is null []`;
    const result = await Contracts.findAll({
        where: {
            [Op.or]: [
                { contractNumber: { [Op.like]: `%${query}%` } },
                { mobile: { [Op.like]: `%${query}%` } },
                { mcasNumber: { [Op.like]: `%${query}%` } },
                { cif: { [Op.like]: `%${query}%` } },
            ],
        }, limit: 10
    });
    return result;
}