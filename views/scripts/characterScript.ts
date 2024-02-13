declare const context: {
    id: string;
    hashCode: number;
    update: number;
}

setInterval(async () => {
    const response = await fetch(`check?id=${context.id}&hash=${context.hashCode}`, {
        method: "GET"
    });

    const data = await response.json();

    if (data.update) {
        window.location.reload();
    }
}, context.update);