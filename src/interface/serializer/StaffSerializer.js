"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffSerializer = void 0;
const _serializeSingleStaff = (staff) => {
    return {
        id: staff.id,
        username: staff.username,
        password: staff.password
    };
};
class StaffSerializer {
    serialize(data) {
        if (!data) {
            throw new Error('expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleStaff);
        }
        return _serializeSingleStaff(data);
    }
}
exports.StaffSerializer = StaffSerializer;
