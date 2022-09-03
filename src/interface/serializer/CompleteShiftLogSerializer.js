"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteShiftLogSerializer = void 0;
const _serializeSingleCompleteShiftLog = (completeShiftLog) => {
    return {
        id: completeShiftLog.id,
        info: completeShiftLog.info,
        updated_at: completeShiftLog.updated_at
    };
};
class CompleteShiftLogSerializer {
    serialize(data) {
        if (!data) {
            throw new Error('expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleCompleteShiftLog);
        }
        return _serializeSingleCompleteShiftLog(data);
    }
}
exports.CompleteShiftLogSerializer = CompleteShiftLogSerializer;
