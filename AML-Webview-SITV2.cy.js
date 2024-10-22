describe('AML', () => {
    let extractedUrl;
    let Url;
    let finalurl;

    describe('Call PE && Open Webview', () => {   
        it('Passed',() => {
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
                'resourceOwnerId':'00000023722490',
                'requestUId':'5c00d79e-2cca-4413-b40a-d6ab8e9eddcf'   
              },
              
            }).then(response => {
              // ตรวจสอบว่า response.status เท่ากับ 200 และ response.data.data.callbackUrl มีอยู่
              if (response.status === 200 && response.body.status.code === 1000) {
                const Url = response.body.data.callbackUrl;
                console.log(Url);
                extractedUrl = Url.split('=')[1];
                console.log(extractedUrl);
                cy.log('test branch')
                expect(extractedUrl).to.not.be.undefined; // ตรวจสอบว่าค่า extractedUrl ไม่ใช่ undefined
                cy.log('Open Webview')
        cy.visit(`https://fatcaportal-sit.se.scb.co.th/aml/web?UserId=test&accept-language=th&code=${extractedUrl}&ekycMethod=1&referenceID=23123&userType=23&funcNm=223&service=123`);
        cy.wait(4000)
        cy.get('.btn-confirm',{ timeout: 10000 }).debug().should('be.visible').click()
        cy.wait(5000)
        cy.get('.btn-confirm').scrollIntoView({ duration: 5000 }).click()
        cy.wait(2000)
        cy.log('Working Infomation')
        cy.get(':nth-child(1) > [style="font-size: 22px; height: 44px; border-radius: 4px; border: 1px solid rgb(201, 198, 205); padding: 0px 12px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; color: rgb(53, 50, 57);"]').click()
        cy.wait(2000)
        cy.get('.scroll-content > :nth-child(7)').click()
        cy.wait(500)
        cy.get(':nth-child(2) > [style="display: flex; flex-direction: column;"] > .textfield-input')
        .clear().type('พรรคการเมืองแห่งหนึ่ง')// Company
        cy.wait(200)
        cy.get('[style="display: flex; justify-content: center; align-items: center; width: 24px;"] > img').click()
        cy.wait(200)
        cy.get('.infomation-content > :nth-child(1) > [style="display: flex; flex-direction: column;"] > .textfield-input')
        .clear().type('127/93') // house no.
        cy.wait(200)
        cy.get('.infomation-content > :nth-child(2) > [style="display: flex; flex-direction: column;"] > .textfield-input')
        .clear().type('คอนโดในหมู่บ้านชนบทในเมืองหลวงแห่งนึง') //Village name/building
        cy.wait(200)
        cy.get('[style="background-color: white; margin-top: 16px; padding-right: 8px;"] > [style="display: flex; flex-direction: column;"] > .textfield-input')
        .clear().type('96') //Unit
        cy.wait(200)
        cy.get('[style="background-color: white; margin-top: 16px; padding-left: 8px;"] > [style="display: flex; flex-direction: column;"] > .textfield-input')
        .clear().type('87') //Floor
        cy.wait(200)
        cy.get(':nth-child(4) > [style="display: flex; flex-direction: column;"] > .textfield-input')
        .clear().type('3') //moo
        cy.wait(200)
        cy.get(':nth-child(5) > [style="display: flex; flex-direction: column;"] > .textfield-input')
        .clear().type('เปลี่ยวแห่งหนึ่งใจกลางหมู่บ้าน') //soi
        cy.wait(200)
        cy.get(':nth-child(6) > [style="display: flex; flex-direction: column;"] > .textfield-input')
        .clear().type('โดดเดี่ยวในซอยเปลี่ยนใจกลางหมู่บ้าน') //trok
        cy.wait(200)
        cy.get(':nth-child(7) > [style="display: flex; flex-direction: column;"] > .textfield-input')
        .clear().type('เส้นหลักของประเทศสารขัณฑ์') //road
        cy.wait(200)
        cy.log('Working Address')
        cy.get('[style="font-size: 22px; height: 44px; border-radius: 4px; border: 1px solid rgb(201, 198, 205); padding: 0px 12px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; color: rgb(53, 50, 57);"]').click()
        cy.wait(1000)
        cy.get('.scroll-content > :nth-child(2)').click()//Province
        cy.wait(1000)
        cy.get(':nth-child(50)').click() // Sub-District
        cy.wait(1000)
        cy.get('.scroll-content > :nth-child(3)').click() // District
        cy.wait(1000)
        cy.get('[style="padding: 24px; background-color: rgb(255, 255, 255); border: 1px solid rgb(234, 231, 236);"]').click() // Postcode
        cy.wait(1000)
        cy.get('.btn-confirm').scrollIntoView({ duration: 5000 }).click()
        cy.wait(1000)
        cy.log('Back to Working Infomation')
        cy.get('.scroll-content').scrollTo('bottom')
        cy.wait(500)
        cy.get(':nth-child(4) > [style="font-size: 22px; height: 44px; border-radius: 4px; border: 1px solid rgb(201, 198, 205); padding: 0px 12px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; color: rgb(53, 50, 57);"]').click() // SourceofIncome
        cy.wait(1000)
        cy.get('.scroll-content > :nth-child(1)').click()
        cy.wait(500)
        cy.get(':nth-child(5) > [style="display: flex; flex-direction: column;"] > .textfield-input').clear().type('3748334')
        cy.wait(500)
        cy.get('.btn-confirm').click()
        cy.wait(10000)
        cy.log('Contact Infomation')
        cy.get('.btn-confirm').click()
        cy.wait(1000)
        cy.log('Review')
        cy.get('[style="align-content: end; padding: 24px 16px; flex: 1 1 0%; background-color: rgb(245, 243, 246);"]').scrollIntoView({ duration: 5000 }) // Scrolls 'footer' into view
        cy.wait(5000)
        cy.get('.btn-confirm').click()
        cy.wait(500)
        cy.get(':nth-child(2) > span').click()

              } else {
                throw new Error('Response status is not as expected');
              }
            });  
          });
        });  
})