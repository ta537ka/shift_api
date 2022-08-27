import { Staff } from "../../domain/Staff";
import { IStaffRepository } from "../repository/IStaffReposiroty";

export class CreateStaff {
    private staffRepository: IStaffRepository;

    constructor(staffRepository: IStaffRepository) {
        this.staffRepository = staffRepository;
    }

    execute(username: string, password: string) {
        const staff = new Staff(username, password);
        return this.staffRepository.persist(staff);
    }
}