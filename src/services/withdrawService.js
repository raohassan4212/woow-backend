import { Op } from "sequelize";
import WithdrawRequest from '../models/withdrawRequest.model.js';
import User from '../models/user.model.js';

/**
 * Get all withdraw requests with user details, pagination, and filtering
 * @param {Object} options - Query options
 * @param {number} [options.page=1] - Page number
 * @param {number} [options.limit=10] - Items per page
 * @param {string} [options.sortBy=created] - Field to sort by
 * @param {string} [options.sortOrder=DESC] - Sort order (ASC or DESC)
 * @param {string} [options.search=''] - Search term to filter by user name or email
 * @param {number} [options.user_id] - Filter by specific user ID
 * @param {number} [options.status] - Filter by status (0 = pending, 1 = approved, 2 = rejected)
 * @param {number} [options.minAmount] - Minimum withdrawal amount
 * @param {number} [options.maxAmount] - Maximum withdrawal amount
 * @param {string} [options.startDate] - Start date for filtering (YYYY-MM-DD)
 * @param {string} [options.endDate] - End date for filtering (YYYY-MM-DD)
 * @returns {Promise<Object>} - Object containing withdraw requests with user details and pagination info
 */
export async function getWithdrawRequests(options = {}) {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'created',
            sortOrder = 'DESC',
            search = '',
            user_id,
            status,
            minAmount,
            maxAmount,
            startDate,
            endDate,
            id
        } = options;

        // Validate pagination parameters
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
        const offset = (pageNum - 1) * limitNum;

        // Build where clause
        const where = {};
        const userWhere = {};

        if (id) where.id = id;
        if (user_id) where.user_id = user_id;
        if (status !== undefined) where.status = status;

        // Handle amount range filtering
        if (minAmount || maxAmount) {
            where.amount = {};
            if (minAmount) where.amount[Op.gte] = parseFloat(minAmount);
            if (maxAmount) where.amount[Op.lte] = parseFloat(maxAmount);
        }

        // Handle date range filtering
        if (startDate || endDate) {
            where.created = {};
            if (startDate) where.created[Op.gte] = new Date(startDate);
            if (endDate) {
                const endOfDay = new Date(endDate);
                endOfDay.setHours(23, 59, 59, 999);
                where.created[Op.lte] = endOfDay;
            }
        }

        // Add search condition for user's name or email
        if (search) {
            userWhere[Op.or] = [
                { username: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { first_name: { [Op.like]: `%${search}%` } },
                { last_name: { [Op.like]: `%${search}%` } }
            ];
        }

        // Validate sort parameters
        const validSortFields = ['id', 'amount', 'status', 'created', 'user_id'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'created';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Execute query with pagination and user join
        const { count, rows: data } = await WithdrawRequest.findAndCountAll({
            where,
            include: [{
                model: User,
                as: 'user',
                where: userWhere,
                attributes: ['id', 'username', 'email', 'first_name', 'last_name', 'profile_pic'],
                required: true
            }],
            order: [[sortField, order]],
            limit: limitNum,
            offset: offset
        });

        // Calculate pagination metadata
        const totalPages = Math.ceil(count / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            code: 200,
            success: true,
            message: 'Withdraw requests retrieved successfully',
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
        console.error('Error in getWithdrawRequests service:', error);
        throw new Error(`Failed to fetch withdraw requests: ${error.message}`);
    }
}

export const withdrawService = {
    getWithdrawRequests
};
