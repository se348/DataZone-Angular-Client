
export class CloseToast {
  static readonly type = '[Toast] Close';
  constructor() {}
}

export class ShowToast {
  static readonly type = '[Toast] Show';
  constructor(public payload: string) {}
}
