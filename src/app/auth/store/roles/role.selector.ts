import { Selector, createPropertySelectors } from "@ngxs/store";
import { RoleState, RoleStateModel } from "./role.state";
import { Role } from "../../models/role.model";


export class RoleSelector {
    static slices = createPropertySelectors<RoleStateModel>(RoleState);

    @Selector([RoleState])
    static roles(state: RoleStateModel): Role[] {
        return state.roles;
    }
}