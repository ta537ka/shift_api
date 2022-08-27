import { IStaffRepository } from "../repository/IStaffReposiroty";

export class DeleteStaff {
    private staffRepository: IStaffRepository;

    constructor(staffRepository: IStaffRepository) {
        this.staffRepository = staffRepository;
    }

    execute(id: number) {
        const staff = this.staffRepository.delete(id);
        return staff;
    }
}