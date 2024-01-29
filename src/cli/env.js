const parseEnv = () => {
    const rssVariables = [];
    Object.entries(process.env).forEach(([key, value]) => {
        if (key.match(/RSS_/)) {
            rssVariables.push(`${key}=${value}`);
        }
    });
    console.log(rssVariables.join("; "));
};

parseEnv();
