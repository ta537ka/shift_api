import { IStaffRepository } from "../repository/IStaffReposiroty";

export class GetStaff {
    private staffRepository: IStaffRepository;

    constructor(staffRepository: IStaffRepository) {
        this.staffRepository = staffRepository;
    }

    execute(id: number) {
        return this.staffRepository.find(id);
    }
}