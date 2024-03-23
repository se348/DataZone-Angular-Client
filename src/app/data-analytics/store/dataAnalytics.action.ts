export class CancelRequest {
  static readonly type = `[DataAnalytics] ${CancelRequest.name}`;
  constructor() {}
}

export class StartExploratoryConnection {
  static readonly type = `[DataAnalytics] ${StartExploratoryConnection.name}`;
  constructor(
  ) {}
}

export class StartRegressionConnection {
  static readonly type = `[DataAnalytics] ${StartRegressionConnection.name}`;
  constructor(
  ) {}
}

export class SendExploratoryRequest {
  static readonly type = `[DataAnalytics] ${SendExploratoryRequest.name}`;

  constructor(
    public methodName: string,
    public payload: any
  ) {}
}

export class SendRegressionRequest {
  static readonly type = `[DataAnalytics] ${SendRegressionRequest.name}`;

  constructor(
    public methodName: string,
    public payload: any
  ) {}
}

export class OpenConnection {
  static readonly type = `[DataAnalytics] ${OpenConnection.name}`;
  constructor(
  ) {}
}
  export class CloseConnection {
  static readonly type = `[DataAnalytics] ${CloseConnection.name}`;
  constructor(
  ) {}
}

export class GetExploratoryResult {
  static readonly type = `[DataAnalytics] ${GetExploratoryResult.name}`;
  constructor(
  ) {}
}
export class GetRegressionResult {
  static readonly type = `[DataAnalytics] ${GetRegressionResult.name}`;
  constructor(
  ) {}
}

