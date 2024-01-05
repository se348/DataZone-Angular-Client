import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { RoleFacade } from '../../facades/role.facades';



interface RolesListComponentState {
  roles: Role[];
}

const initRolesListComponentState: RolesListComponentState = {
  roles: []
}


@Component({
  selector: 'app-roles-list',
  standalone: false,
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss'
})
export class RolesListComponent implements OnInit {
  roles$: Observable<Role[]> = this.state.select('roles');
  roles: Role[] = [];

  constructor(private state: RxState<RolesListComponentState>, private roleFacade: RoleFacade) {
    state.set(initRolesListComponentState);
    state.connect('roles', roleFacade.roles$);
  }

  ngOnInit(): void {
    this.roles$.subscribe(
      (roles) => {
        this.roles = roles;
      }
    );
  }

}
