import User from '../models/user.model.js';
import Video from '../models/video.model.js';
import VideoLike from '../models/videoLike.model.js';
import Follower from '../models/follower.model.js';
import { Op } from "sequelize";

export async function getUsers(options = {}) {
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
                { first_name: { [Op.iLike]: `%${search}%` } },
                { last_name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { username: { [Op.iLike]: `%${search}%` } }
            ];
        }

        if (active !== null) {
            whereClause.active = active;
        }

        // Validate sort parameters
        const validSortFields = ['id', 'first_name', 'last_name', 'email', 'created', 'username'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'created';
        const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Execute query with pagination
        const { count, rows: users } = await User.findAndCountAll({
            where: whereClause,
            attributes: {
                exclude: ['password', 'salt', 'auth_token', 'token', 'device_token']
            },
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
            message: 'Get Users Successfully',
            data: {
                users,
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
        console.error('Error in getUsers service:', error);
        throw new Error(`Failed to fetch users: ${error}`);
    }
}

export async function getUserWithAllDetails(options = {}) {
    try {
        const { id } = options;
 
        const user = await User.findByPk(id, {
            attributes: {
                exclude: ['password', 'salt', 'auth_token', 'token', 'device_token']
            },
            include: [
                {
                    model: Video,
                    as: 'videos',
                    separate: true,
                    order: [['created', 'DESC']]
                },
                {
                    model: VideoLike,
                    as: 'likedVideos',
                    separate: true,
                    include: [
                        {
                            model: Video,
                            as: 'video',
                            include: [
                                {
                                    model: User,
                                    as: 'user',
                                    attributes: ['id', 'username', 'first_name', 'last_name', 'profile_pic']
                                }
                            ]
                        }
                    ],
                    order: [['created', 'DESC']]
                },
                {
                    model: Follower,
                    as: 'followers',
                    separate: true,
                    include: [
                        {
                            model: User,
                            as: 'senderUser',
                            attributes: ['id', 'username', 'first_name', 'last_name', 'profile_pic', 'verified']
                        }
                    ],
                    order: [['created', 'DESC']]
                },
                {
                    model: Follower,
                    as: 'following',
                    separate: true,
                    include: [
                        {
                            model: User,
                            as: 'receiverUser',
                            attributes: ['id', 'username', 'first_name', 'last_name', 'profile_pic', 'verified']
                        }
                    ],
                    order: [['created', 'DESC']]
                }
            ]
        });

        if (!user) {
            return {
                code: 404,
                success: false,
                message: 'User not found',
                data: null
            };
        }

        // Separate videos by privacy type
        const allVideos = user.videos || [];
        const publicVideos = allVideos.filter(video => 
            video.privacy_type === 'public' || video.privacy_type === 'Public' || !video.privacy_type
        );
        const privateVideos = allVideos.filter(video => 
            video.privacy_type === 'private' || video.privacy_type === 'Private'
        );

        // Extract liked videos data
        const likedVideos = user.likedVideos?.map(like => like.video) || [];

        // Extract followers with user details
        const followers = user.followers?.map(follower => ({
            id: follower.id,
            created: follower.created,
            user: follower.senderUser
        })) || [];

        // Extract following with user details
        const following = user.following?.map(follow => ({
            id: follow.id,
            created: follow.created,
            user: follow.receiverUser
        })) || [];

        // Prepare response data
        const userData = user.toJSON();
        delete userData.videos;
        delete userData.likedVideos;
        delete userData.followers;
        delete userData.following;

        return {
            code: 200,
            success: true,
            message: 'User details retrieved successfully',
            data: {
                user: userData,
                videos: {
                    all: allVideos,
                    public: publicVideos,
                    private: privateVideos,
                    total_count: allVideos.length,
                    public_count: publicVideos.length,
                    private_count: privateVideos.length
                },
                liked_videos: {
                    videos: likedVideos,
                    count: likedVideos.length
                },
                followers: {
                    list: followers,
                    count: followers.length
                },
                following: {
                    list: following,
                    count: following.length
                }
            }
        };

    } catch (error) {
        console.error('Error in getUserWithAllDetails service:', error);
        throw new Error(`Failed to fetch user details: ${error.message}`);
    }
}

export const usersService = {
    getUsers,
    getUserWithAllDetails,
}
