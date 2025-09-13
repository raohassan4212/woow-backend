
import User from '../models/user.model.js';
import Video from '../models/video.model.js';
import { Op } from "sequelize";

export async function getAnalytics(options = {}) {
    try {
        // Get filter period from options (default: 'month')
        const filterPeriod = options.period || 'month';
        
        // Get current date and calculate date ranges
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Calculate comparison dates based on filter period
        let comparisonDate, comparisonText;
        
        switch (filterPeriod) {
            case 'month':
                comparisonDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                comparisonText = 'vs last month';
                break;
            case '6months':
                comparisonDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
                comparisonText = 'vs 6 months ago';
                break;
            case 'year':
                comparisonDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
                comparisonText = 'vs last year';
                break;
            default:
                comparisonDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                comparisonText = 'vs last month';
        }
        
        // Get Total Users
        const totalUsers = await User.count();
        const usersComparison = await User.count({
            where: {
                created: {
                    [Op.lt]: comparisonDate
                }
            }
        });
        
        // Calculate user percentage change
        const userPercentageChange = usersComparison > 0 
            ? ((totalUsers - usersComparison) / usersComparison * 100).toFixed(1)
            : 0;
        
        // Get Total Videos
        const totalVideos = await Video.count();
        const videosComparison = await Video.count({
            where: {
                created: {
                    [Op.lt]: comparisonDate
                }
            }
        });
        
        // Calculate video percentage change
        const videoPercentageChange = videosComparison > 0 
            ? ((totalVideos - videosComparison) / videosComparison * 100).toFixed(1)
            : 0;
        
        // Get Daily Uploads (today's videos)
        const dailyUploads = await Video.count({
            where: {
                created: {
                    [Op.gte]: today,
                    [Op.lt]: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                }
            }
        });
        
        // Get yesterday's uploads for comparison
        const yesterdayUploads = await Video.count({
            where: {
                created: {
                    [Op.gte]: yesterday,
                    [Op.lt]: today
                }
            }
        });
        
        // Calculate daily uploads percentage change
        const dailyUploadsPercentageChange = yesterdayUploads > 0 
            ? ((dailyUploads - yesterdayUploads) / yesterdayUploads * 100).toFixed(1)
            : 0;

        return {
            code: 200,
            success: true,
            message: 'Get Analytics Successfully',
            data: {
                totalUsers: {
                    count: totalUsers.toLocaleString(),
                    percentageChange: `+${userPercentageChange}%`,
                    comparisonText: comparisonText
                },
                totalVideos: {
                    count: totalVideos.toLocaleString(),
                    percentageChange: `+${videoPercentageChange}%`,
                    comparisonText: comparisonText
                },
                dailyUploads: {
                    count: dailyUploads.toLocaleString(),
                    percentageChange: `+${dailyUploadsPercentageChange}%`,
                    comparisonText: "vs yesterday"
                }
            }
        };

    } catch (error) {
        console.error('Error in getAnalytics service:', error);
        throw new Error(`Failed to fetch analytics: ${error.message}`);
    }
}


// Get User Growth Analytics for line chart
export async function getUserGrowthAnalytics(options = {}) {
    try {
        const period = options.period || '6months';
        const now = new Date();
        let startDate, months;

        // Calculate date range based on period
        switch (period) {
            case '6months':
                startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
                months = 6;
                break;
            case 'year':
                startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
                months = 12;
                break;
            default:
                startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
                months = 6;
        }

        const growthData = [];
        
        // Generate data for each month
        for (let i = 0; i < months; i++) {
            const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
            const nextMonth = new Date(startDate.getFullYear(), startDate.getMonth() + i + 1, 1);
            
            const userCount = await User.count({
                where: {
                    created: {
                        [Op.lt]: nextMonth
                    }
                }
            });

            const monthName = monthDate.toLocaleDateString('en-US', { month: 'short' });
            
            growthData.push({
                month: monthName,
                users: userCount,
                date: monthDate
            });
        }

        return {
            code: 200,
            success: true,
            message: 'User Growth Analytics Retrieved Successfully',
            data: {
                period: period,
                growthData: growthData
            }
        };

    } catch (error) {
        console.error('Error in getUserGrowthAnalytics service:', error);
        throw new Error(`Failed to fetch user growth analytics: ${error.message}`);
    }
}

// Get Daily Uploads Analytics for bar chart
export async function getDailyUploadsAnalytics(options = {}) {
    try {
        const period = options.period || 'week';
        const now = new Date();
        let startDate, days, labels;

        // Calculate date range based on period
        switch (period) {
            case 'week':
                startDate = new Date(now);
                startDate.setDate(now.getDate() - 6);
                days = 7;
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                labels = Array.from({length: days}, (_, i) => `${i + 1}`);
                break;
            default:
                startDate = new Date(now);
                startDate.setDate(now.getDate() - 6);
                days = 7;
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        }

        const uploadsData = [];

        // Generate data for each day
        for (let i = 0; i < days; i++) {
            const dayDate = new Date(startDate);
            dayDate.setDate(startDate.getDate() + i);
            
            const nextDay = new Date(dayDate);
            nextDay.setDate(dayDate.getDate() + 1);

            const uploadCount = await Video.count({
                where: {
                    created: {
                        [Op.gte]: dayDate,
                        [Op.lt]: nextDay
                    }
                }
            });

            const label = period === 'week' ? labels[i] : labels[i];
            
            uploadsData.push({
                day: label,
                uploads: uploadCount,
                date: dayDate
            });
        }

        return {
            code: 200,
            success: true,
            message: 'Daily Uploads Analytics Retrieved Successfully',
            data: {
                period: period,
                uploadsData: uploadsData
            }
        };

    } catch (error) {
        console.error('Error in getDailyUploadsAnalytics service:', error);
        throw new Error(`Failed to fetch daily uploads analytics: ${error.message}`);
    }
}

export const analyticsService = {
    getAnalytics,
    getUserGrowthAnalytics,
    getDailyUploadsAnalytics
}
