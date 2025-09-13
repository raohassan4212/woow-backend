
import VerificationRequest from '../models/verificationRequest.model.js';
import User from '../models/user.model.js';
import { Op } from "sequelize";

export async function getVerificationRequests(options = {}) {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'created',
            sortOrder = 'DESC',
            search = '',
            verified = null
        } = options;

        // Validate pagination parameters
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // Max 100 items per page
        const offset = (pageNum - 1) * limitNum;

        // Build where clause for filtering
        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { '$User.first_name$': { [Op.iLike]: `%${search}%` } },
                { '$User.last_name$': { [Op.iLike]: `%${search}%` } },
                { '$User.email$': { [Op.iLike]: `%${search}%` } },
                { '$User.username$': { [Op.iLike]: `%${search}%` } }
            ];
        }

        if (verified !== null) {
            whereClause.verified = Number(verified);
        }

        // Validate sort parameters
        const validSortFields = ['id', 'user_id', 'verified', 'update_time', 'created'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'created';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Execute query with pagination
        const { count, rows: verificationRequests } = await VerificationRequest.findAndCountAll({
            where: whereClause,
            include: [{
                model: User,
                as: 'User',
                attributes: ['id', 'first_name', 'last_name', 'email', 'username', 'profile_pic'],
                required: true // Inner join to ensure we only get requests with valid users
            }],
            order: [[sortField, order]],
            limit: limitNum,
            offset: offset,
            distinct: true
        });

        // Calculate pagination metadata
        const totalPages = Math.ceil(count / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            code: 200,
            success: true,
            message: 'Get Verification Requests Successfully',
            data: {
                verificationRequests,
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
        console.error('Error in get Verification Requests service:', error);
        throw new Error(`Failed to fetch verification requests: ${error}`);
    }
}

export const verificationRequestService = {
    getVerificationRequests,
}
