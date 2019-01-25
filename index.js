const express = require('express');
const fs = require('fs');
const toPdf = require("office-to-pdf");

const app = express();

app.get('/', async (req, res) => {
    const wordBuffer = fs.readFileSync("./test.docx");
    const pdfBuffer = await toPdf(wordBuffer);
    res.set('Content-disposition', 'attachment; filename=' + 'generated-pdf' );
    res.set('Content-type', 'application/pdf');
    res.end( pdfBuffer );
});

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});