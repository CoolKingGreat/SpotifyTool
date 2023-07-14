"use server"

import getAccessToken from "./getAccessToken"
import getRefreshToken from "./getRefreshToken"

export default async function getTokens(code: string) {
  const refresh_token = (await getRefreshToken(code)).refresh_token
  const access_token = (await getAccessToken(refresh_token)).access_token

  return {refresh_token: refresh_token, access_token: access_token}
}