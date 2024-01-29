
export class CloseToast {
  static readonly type = '[Toast] Close';
  constructor() {}
}

export class ShowToast {
  static readonly type = '[Toast] Show';
  constructor(public payload: string) {}
}


export class ShowSuccessToast {
  static readonly type = '[Toast] Show Success';
  constructor(public payload: string) {}
}

export class ShowErrorToast {
  static readonly type = '[Toast] Show Error';
  constructor(public payload: string) {}
}
