import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { Role } from "../../models/role.model";
import { Injectable } from "@angular/core";
import { RoleService } from "../../services/role.service";
import { GetRoles } from "./role.actions";
import { tap } from "rxjs";



export interface RoleStateModel {
    roles: Role[]
}

const ROLE_STATE_TOKEN = new StateToken<RoleStateModel>('roleState');

const defaultState: RoleStateModel = {
    roles: []
};

@State<RoleStateModel>({
    defaults: defaultState,
    name: ROLE_STATE_TOKEN
})
@Injectable()
export class RoleState {
    constructor(private roleService: RoleService) {}

    @Action(GetRoles)
    getRoles(
        { patchState } : StateContext<RoleStateModel>
    ) {
        return this.roleService.getRoles().pipe(tap(
            (fetchedRoles) => {
                patchState({
                    roles: fetchedRoles
                });
            }
        ));
    }
}