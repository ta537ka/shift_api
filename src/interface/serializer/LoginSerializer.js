"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSerializer = void 0;
const _serializeSingleLogin = (user) => {
    return {
        id: user.id,
        username: user.username,
        password: user.password
    };
};
class LoginSerializer {
    serialize(data) {
        if (!data) {
            throw new Error('expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleLogin);
        }
        return _serializeSingleLogin(data);
    }
}
exports.LoginSerializer = LoginSerializer;
