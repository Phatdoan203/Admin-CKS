import { Op } from "sequelize";
import { Contracts } from "../models/Contracts";

export const getPaginatedContracts = async (page : number, limit : number, query : string | (() => string)) => {
    const offset = (page - 1) * limit;
    // Nếu query là hàm, gọi nó để lấy chuỗi
    const searchQuery = typeof query === 'function' ? query() : query;
    

    const { count, rows } = await Contracts.findAndCountAll(
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



export const searchContract = async (query : string) => {
    if (!query) return `query is null []`;
    const result = await Contracts.findAndCountAll({
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