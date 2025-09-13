import { verificationRequestService } from '../services/verificationRequestService.js';

const getVerificationRequests = async (req, res) => {
    try {
        const verificationRequests = await verificationRequestService.getVerificationRequests(req.query);
        return res.status(201).json(verificationRequests);
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

export const verificationRequestController = {
    getVerificationRequests
}
