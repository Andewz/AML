describe ('Fatca have Tin',() =>{
    let random = Math.floor(Math.random() * 250)+1;
    let random2 = Math.floor(Math.random() * 250)+1;
    let extractedUrl;
    let Url;
    it('Visit',() => {

        cy.request({
            method: 'GET',
            form: true,
            url: 'https://api-sit.partners.scb/partners/v3/consent/3f3e065b-279f-459c-8395-12707aa7ab36',
            headers: {
              'Cookie':'TS014b3884=01bfa4d02968039667d03c13ec098345b79491195120db61635806ae2e336bb89fdd8a987f8dec47018d0f5d5ca9cd814770926ef5',
              'Cookie':'TS014b3884=01bfa4d0294ba018919fb22ac88d0544bbee5046bf36a9d9a5b719b1d5f9e4ad73f199b417547f603b2232c6ba0e1e2d5d33923117',
              'apikey':'l7bfcf066a5d0d4ff6b48657cb57f5e0f9',
              'apisecret':'5474e01e90eb44e6963c5c2191d5a83e',
              'content-type':'application/json',
              'accept-language':'en',
              'resourceOwnerId':'00000023722690',
              'requestUId':'5c00d79e-2cca-4413-b40a-d6ab8e9eddcf'   
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
        cy.visit(`https://fatcaportal-sit.se.scb.co.th/crs/web?ekycMethod=NDID&accept-language=EN&referenceID=894fca40-3901-4ab8-a640-2c0ed479d3c3&userType=NTB&UserId=ENET&funcNm=Search&service=crs&code=${extractedUrl}`);
        cy.wait(4000)

        cy.log('Answer Fatca');
        cy.get('#ansNo_0').click();
        cy.wait(1000)
        cy.get('#ansNo_1').click();
        cy.wait(1000)
        cy.get('#ansNo_2').click();
        cy.wait(1000)
        cy.get('#ansNo_3').click();
        cy.wait(1000)
        cy.get('#ansNo_4').click();
        cy.wait(1000)
        cy.get('#ansNo_5').click();
        cy.wait(1000)

        cy.log('Confirm Fatca');
        cy.get('.btn',{ timeout: 4000 }).debug().should('be.visible').click();
        cy.wait(1000);

        cy.log('HaveTin');
        cy.get('#ansYes_0').click();
        cy.get('.btn',{ timeout: 4000 }).debug().should('be.visible').click();

        cy.log('AddTinNoreason');
        cy.get(':nth-child(1) > .grid > .flex-row',{ timeout: 4000 }).debug().should('be.visible').click();
        cy.wait(1000)
        cy.get(`:nth-child(${random})> .searchList__item`).scrollIntoView({ duration: 4000 }).click();
        cy.wait(1000)
        cy.get(':nth-child(2) > .input-text').clear().type('FR3764324348');
        cy.wait(1000)
        cy.get('.btn > .flex',{ timeout: 4000 }).debug().should('be.visible').click();

        cy.log('Confirm tin');
        cy.get('.bg-\\[\\#7631C1\\]').debug().should('be.visible').click();

        cy.log('Nationlity')
        cy.get('.flex-row').click();
        cy.get(`:nth-child(${random2}) > .searchList__item`).scrollIntoView({ duration: 1000 }).click();
        cy.get(':nth-child(2) > .input-text').clear().type('Bankok');

        cy.log('Complete CRS');
        cy.get('.btn',{ timeout: 4000 }).debug().should('be.visible').click();
        cy.get('#vehicle1').scrollIntoView({ duration: 1000 }).click();
        cy.get('.btn',{ timeout: 4000 }).debug().should('be.visible').click();


    } else {
        throw new Error('Response status is not as expected');
      }

    });
    
    });
});