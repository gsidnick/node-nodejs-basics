const parseArgs = () => {
    const argv = process.argv.slice(2);
    const result = argv
        .reduce(
            (values, key, index) =>
                (index % 2 == 0 ? values.push([key.replace(/^--/, "")]) : values[values.length - 1].push(key)) &&
                values,
            [],
        )
        .map((value) => value.join(" is "))
        .join(", ");
    console.log(result);
};

parseArgs();
