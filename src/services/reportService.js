import Report from '../models/report.model.js';
import ReportReason from '../models/reportReason.model.js';
import User from '../models/user.model.js';
import { Op } from "sequelize";

export async function getReports(options = {}) {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'created',
            sortOrder = 'DESC',
            search = '',
            user_id = null,
            report_reason_id = null,
            type = null,
            value = null
        } = options;

        // Validate pagination parameters
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // Max 100 items per page
        const offset = (pageNum - 1) * limitNum;

        // Build where clause for filtering Report
        const reportWhere = {};
        if (user_id) {
            reportWhere.user_id = user_id;
        }
        if (report_reason_id) {
            reportWhere.report_reason_id = report_reason_id;
        }
        if (type) {
            reportWhere.type = type;
        }
        if (value) {
            reportWhere.value = value;
        }

        // Build where clause for filtering User (search by name)
        const userWhere = {};
        if (search) {
            userWhere[Op.or] = [
                { first_name: { [Op.iLike]: `%${search}%` } },
                { last_name: { [Op.iLike]: `%${search}%` } },
                { username: { [Op.iLike]: `%${search}%` } }
            ];
        }

        // Validate sort parameters
        const validSortFields = ['id', 'user_id', 'type', 'value', 'report_reason_id', 'created'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'created';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Execute query with pagination and proper joins
        const { count, rows: data } = await Report.findAndCountAll({
            where: reportWhere,
            include: [
                {
                    model: User,
                    as: 'user',
                    where: Object.keys(userWhere).length > 0 ? userWhere : undefined,
                    attributes: ['id', 'username', 'first_name', 'last_name', 'email', 'profile_pic', 'verified'],
                    required: false
                },
                {
                    model: ReportReason,
                    as: 'reportReason',
                    attributes: ['id', 'title', 'created'],
                    required: false
                }
            ],
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
            message: 'Get Reports Successfully',
            data: {
                reports: data,
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
        console.error('Error in getReports service:', error);
        throw new Error(`Failed to fetch reports: ${error.message}`);
    }
}


export const reportService = {
    getReports,
}
