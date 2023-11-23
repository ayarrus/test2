export class Retries {
    notUseApiKey?: boolean;
    queryParams?: object;
    limitRetries: number = 2;
    countRetries: number = 0;
    timeout: number = 4000;
    cancelable: boolean = true;
    showPopup: boolean = true;
  }