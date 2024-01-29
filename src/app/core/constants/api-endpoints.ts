export const BASE_URL = 'http://localhost:8888/api/v1';

export const AUTH_URL = `${BASE_URL}/account`;

export const LOGIN_URL = `${AUTH_URL}/login`;

export const COMPLETE_COMPANY_PROFILE_URL = `${BASE_URL}/users/company-profile`;

export const COMPLETE_USER_PROFILE_URL = `${BASE_URL}/users/user-profile`;

export const EDIT_COMPANY_PROFILE_URL = `${BASE_URL}/users/edit-company-profile`;

export const GET_COMPANY_PROFILE_URL = `${BASE_URL}/users/get-company-profile`;

export const GET_USER_PROFILE_URL = `${BASE_URL}/users/get-user-profile`;

export const EDIT_USER_PROFILE_URL = `${BASE_URL}/users/edit-company-profile`;

export const CONFIRM_EMAIL_URL = `${AUTH_URL}/confirmEmail`;

export const REGISTER_URL = `${AUTH_URL}/register`;

export const ROLES_URL = `${BASE_URL}/roles`;

export const RESEND_CONFIRM_EMAIL_URL = `${AUTH_URL}/resendConfirmationEmail`;
