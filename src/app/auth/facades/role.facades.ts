import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { RoleSelector } from '../store/roles/role.selector';
import { GetRoles } from '../store/roles/role.actions';

@Injectable({ providedIn: 'root' })
export class RoleFacade {

    @Select(RoleSelector.roles)
    roles$!: Observable<Role[]>;

    constructor(private store: Store) {}

    
    dispatchGetRoles() {
        return this.store.dispatch(new GetRoles());
    }
}
