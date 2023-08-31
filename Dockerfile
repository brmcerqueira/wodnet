FROM denoland/deno:1.36.3
ENV KANKA_TOKEN=""
ENV HOST=""
ENV PORT="80"
EXPOSE $PORT
WORKDIR /app
USER deno
COPY deps.ts .
RUN deno cache deps.ts
COPY . .
RUN deno cache main.ts
CMD ["sh", "-c", "deno run --allow-all main.ts"]