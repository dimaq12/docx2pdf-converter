const express = require('express');
const fs = require('fs');
const toPdf = require("office-to-pdf");
const zip = require("node-native-zip");

    

const app = express();

app.get('/', async (req, res) => {
    const wordBuffer = fs.readFileSync("./test.docx");
    const pdfBuffer = await toPdf(wordBuffer);
    const archive = new zip();
    archive.add("generated-pdf.pdf", pdfBuffer);
    const archiveBuffer = archive.toBuffer();
    res.set('Content-disposition', 'attachment; filename=' + 'output.zip' );
    res.set('Content-type', 'application/zip');
    res.end( archiveBuffer );
});

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});