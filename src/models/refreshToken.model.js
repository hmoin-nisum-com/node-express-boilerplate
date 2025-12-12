import mongoose from 'mongoose';


const refreshTokenSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
tokenHash: { type: String, required: true },
expires: { type: Date, required: true },
createdByIp: String,
revoked: { type: Boolean, default: false },
revokedByIp: String,
replacedByToken: String
}, { timestamps: true });


export default mongoose.models.RefreshToken || mongoose.model('RefreshToken', refreshTokenSchema);