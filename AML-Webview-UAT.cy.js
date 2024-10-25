describe('AML', () => {

  let rm14 = "00000023884901";

  let extractedUrl;
  let Url;
  let finalurl;
  let rand = Math.floor(Math.random() * 1000);

  it('Passed', () => {
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
        expect(extractedUrl).to.not.be.undefined; // ตรวจสอบว่าค่า extractedUrl ไม่ใช่ undefined


        cy.visit(`https://fatcaportal-uat.se.scb.co.th/aml/web?UserId=test&accept-language=en&code=${extractedUrl}&ekycMethod=1&referenceID=23123&userType=23&funcNm=223&service=123`);
        cy.wait(6000)
        cy.log(`random number: ${rand}`);
        cy.get('.btn-confirm').click()
        cy.wait(6000)
        cy.get('.btn-confirm').scrollIntoView({ duration: 200 }).click()

        cy.get('.title').should('have.text', 'Working information')
        cy.get(':nth-child(1) > [style="font-size: 22px; height: 44px; border-radius: 4px; border: 1px solid rgb(201, 198, 205); padding: 0px 12px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; color: rgb(53, 50, 57);"]').click()
        cy.wait(700)
        cy.get('.scroll-content > :nth-child(7)').click()
        cy.wait(700)
        cy.get(':nth-child(2) > [style="display: flex; flex-direction: column;"] > .textfield-input')
          .clear().type(`พรรคการเมืองแห่งหนึ่ง${rand}`)// Company
        cy.get('[style="display: flex; justify-content: center; align-items: center; width: 24px;"] > img').click()

        cy.get('.title').should('have.text', 'Working address')
        cy.get('.infomation-content > :nth-child(1) > [style="display: flex; flex-direction: column;"] > .textfield-input')
          .clear().type(`${Math.floor(Math.random() * 100)}/${rand}`) // house no.
        cy.get('.infomation-content > :nth-child(2) > [style="display: flex; flex-direction: column;"] > .textfield-input')
          .clear().type(`คอนโดในหมู่บ้านชนบทในเมืองหลวงแห่งนึง${rand}`) //Village name/building
        cy.get('[style="background-color: white; margin-top: 16px; padding-right: 8px;"] > [style="display: flex; flex-direction: column;"] > .textfield-input')
          .clear().type(`96${rand}`) //Unit
        cy.get('[style="background-color: white; margin-top: 16px; padding-left: 8px;"] > [style="display: flex; flex-direction: column;"] > .textfield-input')
          .clear().type(`87${rand}`) //Floor
        cy.get(':nth-child(4) > [style="display: flex; flex-direction: column;"] > .textfield-input')
          .clear().type(`3${rand}`) //moo
        cy.get(':nth-child(5) > [style="display: flex; flex-direction: column;"] > .textfield-input')
          .clear().type(`เปลี่ยวแห่งหนึ่งใจกลางหมู่บ้าน${rand}`) //soi
        cy.get(':nth-child(6) > [style="display: flex; flex-direction: column;"] > .textfield-input')
          .clear().type(`โดดเดี่ยวในซอยเปลี่ยนใจกลางหมู่บ้าน${rand}`) //trok
        cy.get(':nth-child(7) > [style="display: flex; flex-direction: column;"] > .textfield-input')
          .clear().type(`เส้นหลักของประเทศสารขัณฑ์${rand}`) //road
        cy.log('Working Address')
        cy.get('[style="font-size: 22px; height: 44px; border-radius: 4px; border: 1px solid rgb(201, 198, 205); padding: 0px 12px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; color: rgb(53, 50, 57);"]').click()
        cy.wait(1000)
        cy.get(`.scroll-content > :nth-child(${Math.floor(Math.random() * 77) + 1}`).click()//Province
        cy.wait(700)
        cy.get('.scroll-content > :nth-child(1)').click() // District
        cy.wait(700)
        cy.get('.scroll-content > :nth-child(1)').click() // Sub-District
        cy.wait(700)
        cy.get('[style="padding: 24px; background-color: rgb(255, 255, 255); border: 1px solid rgb(234, 231, 236);"]').click() // Postcode
        cy.wait(1000)
        cy.get('.btn-confirm').scrollIntoView({ duration: 700 }).click()

        cy.get('.title').should('have.text', 'Working information')
        cy.get('.scroll-content').scrollTo('bottom')
        cy.get(':nth-child(4) > [style="font-size: 22px; height: 44px; border-radius: 4px; border: 1px solid rgb(201, 198, 205); padding: 0px 12px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; color: rgb(53, 50, 57);"] > img').click() // SourceofIncome
        cy.wait(1000)
        cy.get(`.scroll-content > :nth-child(${Math.floor(Math.random() * 250) + 1}`).click()
        cy.wait(700)
        cy.get(':nth-child(5) > [style="display: flex; flex-direction: column;"] > .textfield-input').clear().type(`${rand}00`)
        cy.get('.btn-confirm').scrollIntoView({ duration: 500 }).click()

        cy.get('.title').should('have.text', 'Contact information')
        cy.get('.btn-confirm').click()

        cy.get('.title').should('have.text', 'Review information')
        cy.get('.btn-confirm').scrollIntoView({ duration: 500 }).click()
        cy.wait(1000)
        cy.get(':nth-child(2) > span').click()
      }
      else {
        throw new Error('Response status is not as expected');
      }
    })
  })
});