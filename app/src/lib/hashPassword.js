import bcrypt from 'bcryptjs';

export const hashPassword = (string) => {
    return bcrypt.hash(string, 10);
};
