describe('macinodds_admin_test', () => {
    // beforeEach(() => {
    //     cy.visit('/');
    // })

    const device = {
        name: 'name device1 cypress [TEST]',
        serial: 'fakeSerial0001[TEST]',
        spec: 'macinodds test spec1 [TEST]',
        image: 'img_mac.png',
        holder: 'name holder',
        tel: '0888888888'
    }
    var result;
    var macApi = 'http://mac.odds.team/api/mac';


    it(".server , server status", () => {

        // Validate the status
        result = cy.request(macApi);
        result.its('status')
            .should('equal', 200);
        // Validate the header
        result = cy.request(macApi);
        result.its('headers')
            .its('content-type')
            .should('include', 'application/json');
    })

    it(".admin , login", () => {

        cy.visit('/');
        cy.contains('Welcome to mac.odds.team');
        cy.get('#btn-admin').click();

    })

    it(".First Page is view admin", () => {

        cy.url().should("eq", "http://mac.odds.team/admin/app/menu-view-admin");
        cy.contains('Add device').click();
        cy.url().should("eq", "http://mac.odds.team/admin/app/menu-add-device");
        cy.contains('View admin').click();
        cy.contains('Sign out').click();
    })

    it(".Add Device . check contains and clear input", () => {

        cy.get('#btn-admin').click();
        cy.contains('Add device').click();
        cy.contains("ลงทะเบียนอุปกรณ์");
        cy.contains("ชื่ออุปกรณ์");
        cy.contains("Serial");
        cy.contains("สเปค");
        cy.contains("upload file");

        // input file
        cy.contains("สถานะ");
        cy.get('#name').type(device.name, { force: true }).should("have.value", 'name device1 cypress [TEST]');
        cy.get('#serial').type(device.serial, { force: true }).should("have.value", 'fakeSerial0001[TEST]');;
        cy.get('#spec').type(device.spec, { force: true }).should("have.value", 'macinodds test spec1 [TEST]');;
        cy.get('#img-show-upload').click();
        cy.get('#btn-upload-file').click({ force: true });
        cy.fixture('add_device.jpg', 'base64').then(fileContent => {
            cy.get('#button-select-crop').upload({ fileContent, fileName: 'add_device.jpg', mimeType: 'image/*' }, { subjectType: 'input' });
        });
        cy.wait(300)
        cy.get('#button-cropping').click({ force: true });
        cy.get('[name="unavailable"]').click({ force: true });
        cy.get('#holder').should('have.value', '').type(device.holder, { force: true });
        cy.contains("เบอร์ผู้ยืม");
        cy.get('#tel').type(device.tel, { force: true }, { delay: 100 });
        // cy.get('[class="btn btn-default-blue"]').click();
        cy.get('[class="btn btn-default-black"]').click({ force: true });
        // check clear funtion
        cy.get('#name').should('have.value', "")
        cy.get('#serial').should('have.value', "")
        cy.get('#spec').should('have.value', "")
        cy.get('#img-show-upload').should('have.value', "")
        cy.get('#holder').should('have.value', "")
        cy.get('#tel').should('have.value', "")
        cy.wait(100);
        cy.contains('View admin').click();
    })

    it(".Add Device . Add new device (check post api)", () => {
        cy.contains('Add device').click();
        cy.get('#name').type(device.name, { force: true }).should("have.value", 'name device1 cypress [TEST]');
        cy.get('#serial').type(device.serial, { force: true }).should("have.value", 'fakeSerial0001[TEST]');;
        cy.get('#spec').type(device.spec, { force: true }).should("have.value", 'macinodds test spec1 [TEST]');;
        cy.get('#img-show-upload').click();
        cy.get('#btn-upload-file').click({ force: true });
        cy.fixture('img_mac.png', 'base64').then(fileContent => {
            cy.get('#button-select-crop').upload({ fileContent, fileName: 'img_mac.png', mimeType: 'image/*' }, { subjectType: 'input' });
        });
        cy.wait(300)
        cy.get('#button-cropping').click({ force: true }, { delay: 100 });
        cy.get('[class="btn btn-default-blue"]').click();
    })


    it(".Edit device , check form ", () => {

        cy.get('#btn-edit-0').click({ force: true });
        cy.get('#name').should("have.value", 'name device1 cypress [TEST]')
        cy.get('#serial').should("have.value", 'fakeSerial0001[TEST]')
        cy.get('#spec').should("have.value", 'macinodds test spec1 [TEST]')

    })

    it(".Edit device , edit form", () => {

        cy.get('#name').type(2, { force: true }).should("have.value", 'name device1 cypress [TEST]2');
        cy.get('#serial').type(2, { force: true }).should("have.value", 'fakeSerial0001[TEST]2');
        cy.get('#spec').type(2, { force: true }).should("have.value", 'macinodds test spec1 [TEST]2');
        cy.get('[class="btn btn-default-black"]').focus();
        cy.get('[class="btn btn-default-blue"]').click({ force: true });

    })

    it(".View admin , check change after edit", () => {

        cy.get('#name-0').contains("name device1 cypress [TEST]2");
        cy.get('#serial-0').contains('fakeSerial0001[TEST]2');
        cy.get('#spec-0').contains('macinodds test spec1 [TEST]2');
        cy.get('#status-av-0').contains('ว่าง').should('have.css', 'color');

    })

    it(".delete device , delete test device", () => {

        cy.get('#btn-delete-0').click({ force: true });

    })

    // it(".View admin ,check after delete device", () => {

    //     cy.get('[class="list-group"]').children();
    //     // cy.contains("name device1 cypress [TEST]2");
    //     // cy.contains('fakeSerial0001[TEST]2');
    //     // cy.contains('macinodds test spec1 [TEST]2');

    // })
})