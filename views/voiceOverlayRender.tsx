import React, { TsxComplexElement } from "../deps.ts";

export const voiceOverlayRender = (
  oauth2ClientId: string,
  channelId: string,
): TsxComplexElement => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script>
          {`const context = ${
            JSON.stringify({
              oauth2ClientId,
              channelId
            })
          };`}
        </script>
        <script src="/scripts/voiceOverlayScript.js" />
      </head>
      <body>
      </body>
    </html>
  );
};
