import { sequelize } from '../config/db.js';
import User from './user.model.js';
// import PasswordResetToken from './passwordResetToken.model.js';
import VerificationRequest from './verificationRequest.model.js';
import Sound from './sound.modal.js';
import SoundSection from './soundSeaction.model.js';
import Video from './video.model.js';
import VideoLike from './videoLike.model.js';
import Follower from './follower.model.js';
import Hashtag from './hastag.model.js';
import HashtagVideo from './hashtagVideo.model.js';
import Report from './report.model.js';
import ReportReason from './reportReason.model.js';
import WithdrawRequest from './withdrawRequest.model.js';

// Define model relationships
// User.hasMany(PasswordResetToken, {
//   foreignKey: 'user_id',
//   as: 'passwordResetTokens',
// });

// PasswordResetToken.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: 'users',
// });

// VerificationRequest associations
User.hasMany(VerificationRequest, {
  foreignKey: 'user_id',
  as: 'verificationRequests',
});

VerificationRequest.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'User',
});

// Sound and SoundSection associations
SoundSection.hasMany(Sound, {
  foreignKey: 'sound_section_id',
  as: 'sounds',
});

Sound.belongsTo(SoundSection, {
  foreignKey: 'sound_section_id',
  as: 'SoundSection',
});

// Report associations
Report.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'reporter'
});

// Report to Video association
Report.belongsTo(Video, {
  foreignKey: 'value',
  as: 'reportedVideo',
  constraints: false
});

// Report to User association
Report.belongsTo(User, {
  foreignKey: 'value',
  as: 'reportedUser',
  constraints: false
});

// User and Video associations
User.hasMany(Video, {
  foreignKey: 'user_id',
  as: 'videos',
});

Video.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

// User and VideoLike associations
User.hasMany(VideoLike, {
  foreignKey: 'user_id',
  as: 'likedVideos',
});

VideoLike.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

VideoLike.belongsTo(Video, {
  foreignKey: 'video_id',
  as: 'video',
});

Video.hasMany(VideoLike, {
  foreignKey: 'video_id',
  as: 'likes',
});

// Follower associations
// User as follower (sender)
User.hasMany(Follower, {
  foreignKey: 'sender_id',
  as: 'following',
});

// User as followed (receiver)
User.hasMany(Follower, {
  foreignKey: 'receiver_id',
  as: 'followers',
});

Follower.belongsTo(User, {
  foreignKey: 'sender_id',
  as: 'senderUser',
});

Follower.belongsTo(User, {
  foreignKey: 'receiver_id',
  as: 'receiverUser',
});

// Hashtag and HashtagVideo associations
Hashtag.hasMany(HashtagVideo, {
  foreignKey: 'hashtag_id',
  as: 'hashtagVideos',
});

HashtagVideo.belongsTo(Hashtag, {
  foreignKey: 'hashtag_id',
  as: 'hashtag',
});

Video.hasMany(HashtagVideo, {
  foreignKey: 'video_id',
  as: 'hashtagVideos',
});

HashtagVideo.belongsTo(Video, {
  foreignKey: 'video_id',
  as: 'video',
});

// Report and ReportReason associations
User.hasMany(Report, {
  foreignKey: 'user_id',
  as: 'reports',
});

Report.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

ReportReason.hasMany(Report, {
  foreignKey: 'report_reason_id',
  as: 'reports',
});

Report.belongsTo(ReportReason, {
  foreignKey: 'report_reason_id',
  as: 'reportReason',
});

// Withdraw Request association
// Define the association
WithdrawRequest.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});


const db = {
  sequelize,
  User,
  // PasswordResetToken,
  VerificationRequest,
  Sound,
  SoundSection,
  Video,
  VideoLike,
  Follower,
  Hashtag,
  HashtagVideo,
  Report,
  ReportReason,
  WithdrawRequest
};

export default db;
