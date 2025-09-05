import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
const clientId = process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID;

export const isUserPoolConfigured = Boolean(userPoolId && clientId);

const missingEnvMessage =
  "Missing Cognito environment variables NEXT_PUBLIC_COGNITO_USER_POOL_ID or NEXT_PUBLIC_COGNITO_APP_CLIENT_ID";

export const userPool: CognitoUserPool = isUserPoolConfigured
  ? new CognitoUserPool({
      UserPoolId: userPoolId!,
      ClientId: clientId!,
    })
  : (() => {
      if (process.env.NODE_ENV !== "production") {
        console.warn(missingEnvMessage);
        return {
          getCurrentUser: () => null,
          signUp: () => {
            throw new Error(missingEnvMessage);
          },
        } as unknown as CognitoUserPool;
      }
      throw new Error(missingEnvMessage);
    })();

export function getGoogleSignInUrl(): string {
  if (!isUserPoolConfigured) {
    throw new Error("Cognito user pool is not configured");
  }
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