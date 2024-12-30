FROM denoland/deno:2.1.4

EXPOSE ${PORT}

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno install --entrypoint deps.ts

COPY . .

RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-read", "--allow-env", "--allow-write", "main.ts"]