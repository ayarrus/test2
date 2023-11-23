export class SupportType {

    accounts: Account[];
    homes: Home[];
    hubs: Hubs[];
    devices: Devices[];
    guests: Guest[];
    communications: Communication[];
    rateAppScore: RateAppScore[];
    accessControlEntries: AccessControlEntries[]

}

export class Account {

    accountID: number;
    email: string;
    activatedOn: Date;
    enabled: boolean;
    nombre: string;
    apellido: string;

}

export class Home {

    homeID: number;
    homeName: string;
    creationDateLocal: Date;
    virtual: boolean;
    timeZoneDescription: string;
    offSet: number;

}

export class Hubs {

    deviceID: number;
    homeName: string;
    deviceName: string;
    model: string;
    creationDateLocal: Date;
    mac: string;
    currentFirmwareVersion: string;
    lastestVersion: string;
    lastReportedActivity: string;
    lastActivityLocal: Date;
    colorActivity: string;
}

export class Devices {

    endPointID: number;
    home: string;
    hub: string;
    endpointModel: string;
    endPoint: string;
    endPointAddress: string;
    state: string;
    battery: string;
    lastReportedActivity: string;
    dateTimeCreatedLocal: Date;
    colorActivity: string;

}

export class Guest {
    userID: number;
    guestName: string;
    endpointID: number;
    endPointName: string;
    endPointModel: string;
    deviceName: string;
    createdOnLocal: Date;
    fromDateLocalFromTime: string;
    toDateLocalToTime: string;
    d: boolean;
    l: boolean;
    m: boolean;
    mi: boolean;
    j: boolean;
    v: boolean;
    s: boolean;
    accountID: number;
    email: string;
    home: string;
}

export class Communication {

    aCSynch_ID: number;
    thread: number;
    oper: string;
    type: string;
    role: string;
    user: string;
    device: string;
    endpoint: string;
    lastEndpointActivity: string;
    aCUser_ID: number;
    aCSlot_ID: number;
    qSlot: number;
    attempts: number;
    createdDateLocal: Date;
    retryDateLocal: Date;
    completedDateLocal: Date;
    elapsedTime: string;
    colorActivity: string;
    colorActivityEPA: string;
    endPointID: number;

}

export class RateAppScore {
    accountID: number;
    description: string;
    score: number;
    rateUTCDateTime: Date;
    nextPeriodStep: number;
}

export class AccessControlEntries {
    AccessControlEntryID: number;
    EndpointID: number;
    StatusDescription: string;
    ReasonDescription: string;
    SourceDescription: string;
    UserID: number;
    EventDateTimeLocalTime: Date;
    UserName: string;
    EndpointDescription: string;
}