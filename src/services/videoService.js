
import Video from '../models/video.model.js';
import { Op } from "sequelize";

export async function getVideos(options = {}) {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'created',
            sortOrder = 'DESC',
            search = '',
            active = null
        } = options;

        // Validate pagination parameters
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // Max 100 items per page
        const offset = (pageNum - 1) * limitNum;

        // Build where clause for filtering
        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { description: { [Op.iLike]: `%${search}%` } },
                { view: { [Op.iLike]: `%${search}%` } },
                { like_count: { [Op.iLike]: `%${search}%` } },

            ];
        }

        if (active !== null) {
            whereClause.active = active;
        }

        // Validate sort parameters
        const validSortFields = ['id', 'description', 'video', 'created', 'duration'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'created';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Execute query with pagination
        const { count, rows: videos } = await Video.findAndCountAll({
            where: whereClause,
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
            message: 'Get Videos Successfully',
            data: {
                videos,
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
        console.error('Error in getVideos service:', error);
        throw new Error(`Failed to fetch videos: ${error}`);
    }
}


export const videoService = {
    getVideos,
}
