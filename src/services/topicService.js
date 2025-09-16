import { Op } from "sequelize";
import Topic from '../models/topic.model.js';

/**
 * Get all report reasons with pagination and filtering
 * @param {Object} options - Query options
 * @param {number} [options.page=1] - Page number
 * @param {number} [options.limit=10] - Items per page
 * @param {string} [options.sortBy=created] - Field to sort by
 * @param {string} [options.sortOrder=DESC] - Sort order (ASC or DESC)
 * @param {string} [options.search=''] - Search term to filter reasons by title
 * @param {string} [options.view=null] - View to filter reasons by view
 * @returns {Promise<Object>} - Object containing report reasons and pagination info
 */
export async function getTopics(options = {}) {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'created',
            sortOrder = 'DESC',
            search = '',
            id = null,
            view = null,
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
        if (search) {
            where.title = { [Op.like]: `%${search.toLowerCase()}%` };
        }
        if (view) {
            where.view = view;
        }

        // Validate sort parameters
        const validSortFields = ['id', 'title', 'view', 'created'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'created';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Execute query with pagination
        const { count, rows: data } = await Topic.findAndCountAll({
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
            message: 'Get Topics Successfully',
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
        console.error('Error in getTopics service:', error);
        throw new Error(`Failed to fetch topics: ${error.message}`);
    }
}


export const topicService = {
    getTopics,
}
