import { HmacSHA256, enc } from "crypto-js";

export function generateSecretHash(
  username: string,
  clientId: string,
  clientSecret: string,
): string {
  const message = username + clientId;
  const hash = HmacSHA256(message, clientSecret);
  return enc.Base64.stringify(hash);
}
