import { config } from "../config.ts";
import React, { TsxComplexElement } from "../deps.ts";

export const voiceOverlayRender = (
  channelId: string
): TsxComplexElement => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script>
          {`const context = ${
            JSON.stringify({
              oauth2ClientId: config.discord.oauth.clientId,
              channelId
            })
          };`}
        </script>
        <script src="/scripts/overlayVoiceScript.js" />
      </head>
      <body>
      </body>
    </html>
  );
};
