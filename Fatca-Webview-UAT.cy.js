describe('Fatca have Tin', () => {

  let rm14 = "00000023884901";

  let random = Math.floor(Math.random() * 250) + 1;
  let random2 = Math.floor(Math.random() * 250) + 1;
  let extractedUrl;
  let Url;
  it('Visit', () => {

    cy.request({
      method: 'GET',
      url: 'https://api-uat.partners.scb/partners/v3/consent/ddb3107b-5f89-49d7-954e-d52ecaa49a38',
      headers: {
        'Cookie': 'TS019cb087=01bfa4d029df49db2ec51bc064e170eea9252a9c0e5b20c1fed6b0f46661ca2790ab5f68a1b4f9fd62a8ffea2aa179d7dcd62b6de2',
        'apikey': 'l7311f7148299e4504aa4eba4a7536f5a9',
        'apisecret': '3dc5032451bc446cbc574aec25d01247',
        'content-type': 'application/json',
        'accept-language': 'en',
        'resourceOwnerId': rm14,
        'requestUId': '5c00d79e-2cca-4413-b40a-d6ab8e9eddcf'
      },

    }).then(response => {
      // ตรวจสอบว่า response.status เท่ากับ 200 และ response.data.data.callbackUrl มีอยู่
      if (response.status === 200 && response.body.status.code === 1000) {
        const Url = response.body.data.callbackUrl;
        console.log(Url);
        extractedUrl = Url.split('=')[1];
        console.log(extractedUrl);
        cy.log('Check Code')
        expect(extractedUrl).to.not.be.undefined; // ตรวจสอบว่าค่า extractedUrl ไม่ใช่ undefined

        cy.log('OpenURL');
        cy.visit(`https://fatcaportal-uat.se.scb.co.th/crs/web?ekycMethod=NDID&accept-language=EN&referenceID=894fca40-3901-4ab8-a640-2c0ed479d3c3&userType=NTB&UserId=ENET&funcNm=Search&service=crs&code=${extractedUrl}`);
        cy.wait(7000)

        cy.log('Answer Fatca');
        cy.get('#ansNo_0').click();
        cy.get('#ansNo_1').click();
        cy.get('#ansNo_2').click();
        cy.get('#ansNo_3').click();
        cy.get('#ansNo_4').click();
        cy.get('#ansNo_5').click();

        cy.log('Confirm Fatca');
        cy.get('.btn > .flex', { timeout: 4000 }).debug().should('be.visible').click();
        cy.wait(1000);

        cy.log('HaveTin');
        cy.get('#ansYes_0').click();
        cy.get('.btn', { timeout: 4000 }).debug().should('be.visible').click();

        cy.log('AddTinNoreason');
        cy.get(':nth-child(1) > .grid > .flex-row', { timeout: 4000 }).debug().should('be.visible').click();
        cy.wait(1000)
        cy.get(`:nth-child(${random})> .searchList__item`).scrollIntoView({ duration: 1000 }).click();
        cy.wait(1000)
        cy.get(':nth-child(2) > .input-text').clear().type('FR3764324348');
        cy.wait(1000)
        cy.get('.btn > .flex', { timeout: 4000 }).debug().should('be.visible').click();

        cy.log('Confirm tin');
        cy.get('.bg-\\[\\#7631C1\\]').debug().should('be.visible').click();

        cy.log('Nationlity')
        cy.get('.flex-row').click();
        cy.get(`:nth-child(${random2}) > .searchList__item`).scrollIntoView({ duration: 1000 }).click();
        cy.get(':nth-child(2) > .input-text').clear().type('Bankok');

        cy.log('Complete CRS');
        cy.get('.btn', { timeout: 4000 }).debug().should('be.visible').click();
        cy.get('#vehicle1').scrollIntoView({ duration: 1000 }).click();
        cy.get('.btn', { timeout: 4000 }).debug().should('be.visible').click();
        cy.log('test commit');


      } else {
        throw new Error('Response status is not as expected');
      }

    });

  });
});