export const isAuthError = (code: number) => /^4\d{2}$/.test(code.toString());
