import crypto from 'crypto';
import createError from 'http-errors';
import db from '../models/index.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';


export async function register({ name, email, password }) {
    const existing = await db.User.findOne({ where: { email } });
    if (existing) throw createError(409, 'Email already registered');
    const passwordHash = await hashPassword(password);
    const user = await db.User.create({ name, email, passwordHash });
    const token = generateToken({ sub: user.id, email: user.email }, '1h');
    return { user: { id: user.id, name: user.name, email: user.email }, token };
}


export async function login({ email, password }) {
    const user = await db.User.findOne({ where: { email } });
    if (!user) throw createError(401, 'Invalid credentials');
    const match = await comparePassword(password, user.passwordHash);
    if (!match) throw createError(401, 'Invalid credentials');
    const token = generateToken({ sub: user.id, email: user.email }, '1h');
    return { user: { id: user.id, name: user.name, email: user.email }, token };
}


export async function createPasswordResetToken(email) {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return;


    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30);


    await db.PasswordResetToken.create({ userId: user.id, tokenHash, expiresAt });
    return { user, rawToken, expiresAt };
}


export async function resetPassword({ email, token, newPassword }) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const user = await db.User.findOne({ where: { email } });
    if (!user) throw createError(400, 'Invalid request');


    const record = await db.PasswordResetToken.findOne({
        where: { userId: user.id, tokenHash, used: false, expiresAt: { [Symbol.for('gt')]: new Date() } },
        order: [['id', 'DESC']]
    });


    if (!record) throw createError(400, 'Invalid or expired reset token');


    const newHash = await hashPassword(newPassword);
    await db.User.update({ passwordHash: newHash }, { where: { id: user.id } })
    record.used = true;
    await record.save();
    return true;
}

export const authService = {
    register,
    login,
    createPasswordResetToken,
    resetPassword
    }
