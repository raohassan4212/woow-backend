import { videoService } from '../services/videoService.js';

const getVideos = async (req, res) => {
    try {
        const video = await videoService.getVideos(req.query);
        return res.status(201).json(video);
    } catch (error) {
        return res.status(400).json(
            {
                code: 400,
                success: false,
                message: error.message,
                data: null
            }
        );
    }
};

export const videoController = {
    getVideos
}
