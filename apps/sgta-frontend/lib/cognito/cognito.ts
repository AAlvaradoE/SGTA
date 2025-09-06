import { CognitoUserPool, type ICognitoUserPoolData } from "amazon-cognito-identity-js";

interface CognitoUserPoolDataWithSecret extends ICognitoUserPoolData {
  ClientSecret?: string;
}

const clientSecret = process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_SECRET;

const poolData: CognitoUserPoolDataWithSecret = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID!,
  ...(clientSecret ? { ClientSecret: clientSecret } : {}),
};

export const userPool = new CognitoUserPool(poolData);

export function getGoogleSignInUrl(): string {
  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
  const clientId = process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID!;
  const redirect = encodeURIComponent(
    process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!,
  );
  const scope = encodeURIComponent("openid email profile");
  return (
    `${domain}/oauth2/authorize` +
    "?identity_provider=Google" +
    `&redirect_uri=${redirect}` +
    "&response_type=code" +
    `&client_id=${clientId}` +
    `&scope=${scope}`
  );
}
