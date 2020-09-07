require('chromedriver');
const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');
const assert = require('assert');

describe('integration tests ', function() {

    /** @type { WebDriver } */
    let driver;

    before(async function() {
        this.timeout(5000);
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        this.timeout(5000);
        await driver.close();
    });

    beforeEach(async function() {
        this.timeout(5000);
        await driver.get('http://localhost:4200');
    })

    it('CRUD', async function() {
        this.timeout(5000);

        const car = {
            carNumber: 'CDU789',
            owner: 'TEST'
        };

        const updatedCar = {
            carNumber: 'CDU798',
            owner: 'TEST USER'
        };

        // Create car plate number
        const addBtn = await driver.findElement(By.xpath("//*[contains(text(),'Add new car number')]"));
        await addBtn.click();

        await driver.wait(until.urlContains('add'), 1000);

        const carNumberInput = await driver.findElement(By.name('carNumber'));
        await carNumberInput.sendKeys(car.carNumber);

        const ownerInput = await driver.findElement(By.name('owner'));
        await ownerInput.sendKeys(car.owner);

        const saveBtn = await driver.findElement(By.name('submit'));
        await saveBtn.click();

        // See car plate number
        await driver.wait(until.elementLocated(By.name('search')));
        const search = await driver.findElement(By.name('search'));
        await search.sendKeys(car.carNumber);

        // Update car plate number
        const editIcon = await driver.findElement(By.xpath("//*[@svgicon='edit']"));
        await editIcon.click();

        await driver.wait(until.urlContains('edit'), 1000);

        const editCarNumberInput = await driver.findElement(By.name('carNumber'));
        await editCarNumberInput.clear();
        await editCarNumberInput.sendKeys(updatedCar.carNumber);

        const editOwnerInput = await driver.findElement(By.name('owner'));
        await editOwnerInput.clear();
        await editOwnerInput.sendKeys(updatedCar.owner);

        const editSaveBtn = await driver.findElement(By.name('submit'));
        await editSaveBtn.click();

        // See updated car plate number
        await driver.wait(until.elementLocated(By.name('search')));
        const searchAfterEdit = await driver.findElement(By.name('search'));
        await searchAfterEdit.sendKeys(updatedCar.carNumber);

        // Delete car plate number
        const deleteIcon = await driver.findElement(By.xpath("//*[@svgicon='delete']"));
        await deleteIcon.click();

        await driver.switchTo().alert().accept();
    });

    it('car number validation', async function() {
        this.timeout(5 * 1000);

        // Go to add page
        const addBtn = await driver.findElement(By.xpath("//*[contains(text(),'Add new car number')]"));
        await addBtn.click();

        await driver.wait(until.urlContains('add'), 1000);

        // Write invalid car number
        const carNumberInput = await driver.findElement(By.name('carNumber'));
        await carNumberInput.sendKeys("123ABC", Key.TAB);

        // Search for error
        await driver.wait(until.elementLocated(By.tagName('mat-error')));
        const validationError = await driver.findElement(By.tagName('mat-error'));
        const validationErrorText = await validationError.getText();

        assert.strictEqual('Please enter a valid car number', validationErrorText);
    });

    it('car number must be unique', async function() {
        this.timeout(5 * 1000);

        const carPlateNumber = 'GHJ456';

        // Create car plate number
        let addBtn = await driver.findElement(By.xpath("//*[contains(text(),'Add new car number')]"));
        await addBtn.click();

        await driver.wait(until.urlContains('add'), 1000);

        let carNumberInput = await driver.findElement(By.name('carNumber'));
        await carNumberInput.sendKeys(carPlateNumber);

        const ownerInput = await driver.findElement(By.name('owner'));
        await ownerInput.sendKeys('TEST');

        const saveBtn = await driver.findElement(By.name('submit'));
        await saveBtn.click();

        await driver.wait(until.elementLocated(By.name('search')));

        // Try create second car plate number with same car number
        addBtn = await driver.findElement(By.xpath("//*[contains(text(),'Add new car number')]"));
        await addBtn.click();

        await driver.wait(until.urlContains('add'), 1000);

        carNumberInput = await driver.findElement(By.name('carNumber'));
        await carNumberInput.sendKeys(carPlateNumber, Key.TAB);

        // Search for error
        await driver.wait(until.elementLocated(By.tagName('mat-error')));
        const validationError = await driver.findElement(By.tagName('mat-error'));
        const validationErrorText = await validationError.getText();

        assert.strictEqual('Car number is not unique', validationErrorText);

        // Cancel
        const cancelBtn = await driver.findElement(By.name('cancel'));
        await cancelBtn.click();

        // Delete crated car plate number
        await driver.wait(until.elementLocated(By.name('search')));
        const searchAfterEdit = await driver.findElement(By.name('search'));
        await searchAfterEdit.sendKeys(carPlateNumber);

        const deleteIcon = await driver.findElement(By.xpath("//*[@svgicon='delete']"));
        await deleteIcon.click();

        await driver.switchTo().alert().accept();
    });
});
