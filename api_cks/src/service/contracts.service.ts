import { Op } from "sequelize";
import { contracts } from "../models/Contracts";
import { contract_documents } from "../models/ContractDocuments";

export const getPaginatedContracts = async (page : number, limit : number, query : string | (() => string)) => {
    const offset = (page - 1) * limit;
    // Nếu query là hàm, gọi nó để lấy chuỗi
    const searchQuery = typeof query === 'function' ? query() : query;
    

    const { count, rows } = await contracts.findAndCountAll(
        {
        offset,
        limit,
        where: {
            [Op.or]: [
                { contractNumber: { [Op.like]: `%${searchQuery}%` } },
                { mobile: { [Op.like]: `%${searchQuery}%` } },
                { mcasNumber: { [Op.like]: `%${searchQuery}%` } },
                { cif: { [Op.like]: `%${searchQuery}%` } },
            ],
        },
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

export const getPaginatedContractDocs = async (page : number, limit : number, query : string | (() => string)) => {
    const offset = (page - 1) * limit;
    // Nếu query là hàm, gọi nó để lấy chuỗi
    const searchQuery = typeof query === 'function' ? query() : query;

    const { count, rows } = await contract_documents.findAndCountAll(
        {
            offset,
            limit,
            where: {
                [Op.or]: [
                    { contractNumber : { [Op.like]: `%${searchQuery}%` }}
                ]
            } 
        }
    )
    const data = rows.map((item : any) => {
        const contractDocument = item.toJSON();
        return contractDocument;
    })
    return {
        currentPage: page,
        pageSize: limit,
        totalItems: count,
        totalPages : Math.ceil(count / limit),
        data
    }
}

export const searchContract = async (query : string) => {
    if (!query) return `query is null []`;
    const result = await contracts.findAndCountAll({
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