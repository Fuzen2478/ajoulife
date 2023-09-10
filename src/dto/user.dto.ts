export class CreateUserDto {
  email: string;
  password: string;
  verificationCode: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}

export class ChangeNicknameDto {
  currentNickname: string;
  newNickname: string;
}

export class CheckEmailDto {
  email: string;
}
