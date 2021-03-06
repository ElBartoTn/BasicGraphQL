export enum ResultCodeEnum {
  Success = 0,
  PartialSuccess = 1,
  NotPaid = 2,
  UserEmailExists = 10,
  CompanyEmailExists = 11,
  NotAdmin = 20,
  NotAllowed = 30,
  NotFound = 404,
  Failed = 70,
  LockedOut = 71,
  UserDisabled = 80,
  UserNotValidated = 90,
  NothingToDo = 91,
  ClientError = 96,
  NetworkError = 97,
  ServiceError = 98,
  UnknownError = 99,
  NotValidZipCode = 100,
  NotEnoughLicences = 1005,
  AlreadyExists = 1006,
  InvalidCredentials = 4,
  AdditionalInformationNeeded = 5,
  InvalidData = 7
}
