import Sound from '../models/sound.modal.js';
import SoundSection from '../models/soundSeaction.model.js';
import { Op } from "sequelize";

export async function getSounds(options = {}) {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'created',
            sortOrder = 'DESC',
            search = '',
            publish = null
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

        if (publish !== null) {
            whereClause.publish = JSON.parse(publish);
            console.log("whereClause", whereClause);
        }

        // Validate sort parameters
        const validSortFields = ['id','name', 'description', 'created', 'duration'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'created';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Execute query with pagination
        const { count, rows: sounds } = await Sound.findAndCountAll({
            where: whereClause,
            include: [{
                model: SoundSection,
                as: 'SoundSection',
                attributes: ['id', 'name'],
                required: false // Left join to include sounds even without sound sections
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
            message: 'Get Sounds Successfully',
            data: {
                sounds,
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
        console.error('Error in getSounds service:', error);
        throw new Error(`Failed to fetch sounds: ${error}`);
    }
}

export async function getSoundSections(options = {}) {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'name',
            sortOrder = 'DESC',
            search = '',
            publish = null
        } = options;

        // Validate pagination parameters
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // Max 100 items per page
        const offset = (pageNum - 1) * limitNum;

        // Build where clause for filtering
        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
            ];
        }

        if (publish !== null) {
            whereClause.publish = JSON.parse(publish);
            console.log("whereClause", whereClause);
        }

        // Validate sort parameters
        const validSortFields = ['id', 'name'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Execute query with pagination
        const { count, rows: sounds } = await SoundSection.findAndCountAll({
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
            message: 'Get Sound Sections Successfully',
            data: {
                sounds,
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
        console.error('Error in getSoundSections service:', error);
        throw new Error(`Failed to fetch sound sections: ${error}`);
    }
}

export const soundService = {
    getSounds,
    getSoundSections
}