export class AccessToken {
    Token: string;
}

export class AccessTokenResponse {
    // ResponseStatus: ResponseContract;
    AccessToken: AccessToken;
    // LoginType: LoginType;
}

export class Account {
    Firstname: string;
    Lastname: string;
    EMail: string;
    Password: string;
    LanguageCode: string;
    ExternalAccountID: string;
    EmailIsVerified: boolean;
}

export class AccountIDResponse {
    // ResponseStatus: ResponseContract;
    AccountID: number;
}

export class ApplicationToken {
    Token: string;
}

export class InitLoginResponse {
    // ResponseStatus: ResponseContract;
    Token: string;
    Url: string;
}

export class LoginRequest {
    email: string;
    password: string;

}

export class LoginResponse {
    accessToken: string;
    accountID: number;
    email: string;
    firstName: string;
    lastName: string;
    idRol: number;
}

export class DevicesActivity {
    last24Hs: number;
    online: number;
    offlineLast5Mins: number;
    offlineMoreThan5Mins: number;
}
