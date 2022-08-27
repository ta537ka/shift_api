import { IStaffRepository } from "../repository/IStaffReposiroty";

export class ListStaff {
    private staffRepository: IStaffRepository;

    constructor(staffRepository: IStaffRepository) {
        this.staffRepository = staffRepository;
    }

    execute() {
        return this.staffRepository.findAll();
    }
}