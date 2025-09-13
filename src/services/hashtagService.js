import Hashtag from '../models/hastag.model.js';
import HashtagVideo from '../models/hashtagVideo.model.js';
import Video from '../models/video.model.js';
import User from '../models/user.model.js';
import { Op } from "sequelize";

export async function getHashtags(options = {}) {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'id',
            sortOrder = 'DESC',
            search = '',
            hashtag_id = null,
            video_id = null,
            viral = null
        } = options;

        // Validate pagination parameters
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // Max 100 items per page
        const offset = (pageNum - 1) * limitNum;

        // Build where clause for filtering HashtagVideo
        const hashtagVideoWhere = {};
        if (hashtag_id) {
            hashtagVideoWhere.hashtag_id = hashtag_id;
        }
        if (video_id) {
            hashtagVideoWhere.video_id = video_id;
        }

        // Build where clause for filtering Hashtag
        const hashtagWhere = {};
        if (search) {
            hashtagWhere.name = { [Op.iLike]: `%${search}%` };
        }
        if (viral !== null) {
            hashtagWhere.viral = viral;
        }

        // Validate sort parameters
        const validSortFields = ['id', 'hashtag_id', 'video_id'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'id';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Execute query with pagination and proper joins
        const { count, rows: data } = await HashtagVideo.findAndCountAll({
            where: hashtagVideoWhere,
            include: [
                {
                    model: Hashtag,
                    as: 'hashtag',
                    where: hashtagWhere,
                    attributes: ['id', 'name', 'viral']
                },
                {
                    model: Video,
                    as: 'video',
                    attributes: ['id', 'description', 'video', 'thum', 'gif', 'view', 'like_count', 'privacy_type', 'created'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'username', 'first_name', 'last_name', 'profile_pic', 'verified']
                        }
                    ]
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
            message: 'Get Hashtag Videos Successfully',
            data: {
                hashtag_videos: data,
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
        console.error('Error in getHashtags service:', error);
        throw new Error(`Failed to fetch hashtags: ${error.message}`);
    }
}


export const hashtagService = {
    getHashtags,
}
