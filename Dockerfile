FROM denoland/deno:1.36.3
ENV KANKA_TOKEN=""
ENV HOST=""
EXPOSE 80
WORKDIR /app
USER deno
COPY deps.ts .
RUN deno cache deps.ts
COPY . .
RUN deno cache main.ts
CMD ["sh", "-c", "deno run --allow-all --config ./tsconfig.json main.ts --token=${KANKA_TOKEN} --host=${HOST} --port=80"]