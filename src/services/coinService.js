import { Op } from "sequelize";
import CoinWorth from '../models/coinWorth.model.js';

/**
 * Get all report reasons with pagination and filtering
 * @param {Object} options - Query options
 * @param {number} [options.page=1] - Page number
 * @param {number} [options.limit=10] - Items per page
 * @param {string} [options.sortBy=id] - Field to sort by
 * @param {string} [options.sortOrder=DESC] - Sort order (ASC or DESC)
 * @param {number} [options.price=null] - Price to filter by
 * @returns {Promise<Object>} - Object containing report reasons and pagination info
 */
export async function getCoinWorth(options = {}) {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'id',
            sortOrder = 'DESC',
            price = null,
            search = '',
            id = null,
        } = options;

        // Validate pagination parameters
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // Max 100 items per page
        const offset = (pageNum - 1) * limitNum;

        // Build where clause for search
        const where = {};
    
        if (id) {
            where.id = id;
        }
        if (price) {
            const priceValue = parseFloat(price);
            if (!isNaN(priceValue)) {
                // Use a small epsilon for floating point comparison
                where.price = {
                    [Op.between]: [priceValue - 0.0001, priceValue + 0.0001]
                };
            }
        }

        // Validate sort parameters
        const validSortFields = ['id', 'price'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'id';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Execute query with pagination
        const { count, rows: data } = await CoinWorth.findAndCountAll({
            where,
            order: [[sortField, order]],
            limit: limitNum,
            offset: offset,
            raw: true
        });

        // Calculate pagination metadata
        const totalPages = Math.ceil(count / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            code: 200,
            success: true,
            message: 'Get Coin Worth Successfully',
            data: {
                data: data,
                pagination: {
                    currentPage: pageNum,
                    totalPages,
                    totalItems: count,
                    itemsPerPage: limitNum,
                    hasNextPage,
                    hasPrevPage
                }
            }
        };
    } catch (error) {
        console.error('Error in getCoinWorth service:', error);
        throw new Error(`Failed to fetch coin worth: ${error.message}`);
    }
}


export const coinService = {
    getCoinWorth,
}
