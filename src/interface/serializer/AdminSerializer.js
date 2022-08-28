"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSerializer = void 0;
const _serializeSingleAdmin = (admin) => {
    return {
        id: admin.id,
        userename: admin.username,
        password: admin.password
    };
};
class AdminSerializer {
    serialize(data) {
        if (!data) {
            throw new Error('expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleAdmin);
        }
        return _serializeSingleAdmin(data);
    }
}
exports.AdminSerializer = AdminSerializer;
