export type JwtTokenPairDto = {
  accessToken: string;
  refreshToken: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
};

export type LoginRequest = {
  phoneNumber: string;
  password: string;
};

export type UserExistsResponse = {
  exists: boolean;
};

export type ApiErrorResponse = {
  status: number;
  error: string;
  message: string;
  timestamp?: string;
};
