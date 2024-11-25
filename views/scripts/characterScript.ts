declare const context: {
    chronicleId: string;
    id: string;
    versionstamp: string;
    update: number;
}

setInterval(async () => {
    const response = await fetch(`check?chronicleId=${context.chronicleId}&id=${context.id}&versionstamp=${context.versionstamp}`, {
        method: "GET"
    });

    const data = await response.json();

    if (data.update) {
        window.location.reload();
    }
}, context.update);