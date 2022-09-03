import { CompleteShiftLog } from "../../domain/CompleteShiftLog";

const _serializeSingleCompleteShiftLog = (completeShiftLog: CompleteShiftLog) => {
    return {
        id: completeShiftLog.id,
        info: completeShiftLog.info,
        updated_at: completeShiftLog.updated_at
    }
}

export class CompleteShiftLogSerializer {
    serialize(data: any) {
        if (!data) {
            throw new Error('expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleCompleteShiftLog);
        }
        return _serializeSingleCompleteShiftLog(data);
    }
}