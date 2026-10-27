
const { Builder, By, until } = require("selenium-webdriver");

async function testComplaintSubmission() {
  let driver;

  try {
    driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000");

    await driver.wait(
      until.elementLocated(By.name("studentName")),
      10000
    );

    await driver.findElement(By.name("studentName"))
      .sendKeys("Selenium Test Student");

    await driver.findElement(By.name("roomNumber"))
      .sendKeys("101");

    await driver.findElement(By.name("category"))
      .sendKeys("Water Supply");

    await driver.findElement(By.name("description"))
      .sendKeys("Testing complaint submission automatically");

    await driver.findElement(
      By.css('button[type="submit"]')
    ).click();

    await driver.wait(async () => {
      const records = await driver.findElement(
        By.id("complaints")
      ).getText();

      return records.includes("Selenium Test Student");
    }, 10000);

    console.log("PASS: Complaint submitted successfully!");

  } catch (error) {
    console.error("FAIL:", error.message);
    process.exitCode = 1;

  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

testComplaintSubmission();
