const fs = require('fs');
const redirectConf = require('./redirect-config.json');

const getHtml = (toPath) => {
    return `
    <html>
        <head>
            <link rel="canonical" href="${toPath}">
            <script>window.location.href = "${toPath}"</script>
        </head>
        <body></body>
    </html>
    `
}

redirectConf.forEach(row => {
    const generateBaseDir = './public'
    const fromPath = row.fromPath
    const toPath = row.toPath
    const html = getHtml(toPath)
    const path = generateBaseDir + fromPath

    fs.mkdirSync(path + '/amp', { recursive: true }, (err) => {
        if (err) throw err;
    });

    fs.writeFile(path + '/index.html', html, (err) => {
        if (err) throw err;
    })

    fs.writeFile(path + '/amp/index.html', html, (err) => {
        if (err) throw err;
    })
})


