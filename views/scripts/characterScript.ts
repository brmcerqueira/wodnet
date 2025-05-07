// deno-lint-ignore-file no-window
declare const context: {
    token: string;
    versionstamp: string;
    update: number;
}

setInterval(async () => {
    const response = await fetch(`check?token=${context.token}&versionstamp=${context.versionstamp}`, {
        method: "GET"
    });

    const data = await response.json();

    if (data.update) {
        window.location.reload();
    }
}, context.update);