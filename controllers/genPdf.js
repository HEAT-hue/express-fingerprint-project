// jshint esversion:6
const puppeteer = require("puppeteer");
const verifiedStudentsModel = require("../models/verifyStud");

// Working without cursor
const getDocs = async (courseId, studTemplate) => {
  let index = 0;
  let htmlString = "";

  for await (const doc of verifiedStudentsModel.find({
    courseName: courseId,
  })) {
    index = index + 1;
    let template = studTemplate;
    template = template
      .replace("%INDEX%", index)
      .replace("%REGNUM%", doc.regNum);
    htmlString += template;
  }
  return htmlString;
};

module.exports = async (courseId) => {
  let htmlHead =
    '<!DOCTYPE html><html lang="en"><head><title>Document</title><style>body {font-size: 1.05rem;padding: 20px;font-family: Arial, Helvetica, sans-serif;}#grid-cont {display: grid;grid-template-columns: 100px auto;align-items: center;} div {margin-bottom: 10px;}</style></head><body><h3>%CID% STUDENT VERIFICATION LIST</h3><div id="grid-cont"><div class="col-head"><b>S/N</b></div><div class="col-head"><b>REGISTRATION NUMBER</b></div>';

  htmlHead = htmlHead.replace("%CID%", courseId);

  let htmlFooter = "</div></body></html>";

  const studTemplate = "<div><b>%INDEX%</b></div><div>%REGNUM%</div>";
  console.log("Printing documents");

  let htmlBody = await getDocs(courseId, studTemplate);

  console.log("Finished printing document");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlPage = htmlHead + htmlBody + htmlFooter;

  await page.setContent(htmlPage);

  const pdfBuffer = await page.pdf();

  await page.close();
  await browser.close();

  return pdfBuffer;
};
