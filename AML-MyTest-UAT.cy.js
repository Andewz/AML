describe('AML', () => {
    let extractedUrl;
    let Url;
    let finalurl;

    describe('CallPE', () => {   
        it('Passed',() => {
            cy.request({
              method: 'GET',
              form: true,
              url: 'https://api-uat.partners.scb/partners/v3/consent/ddb3107b-5f89-49d7-954e-d52ecaa49a38',
              headers: {
                'Cookie':'TS019cb087=01bfa4d029df49db2ec51bc064e170eea9252a9c0e5b20c1fed6b0f46661ca2790ab5f68a1b4f9fd62a8ffea2aa179d7dcd62b6de2',
                'apikey':'l7311f7148299e4504aa4eba4a7536f5a9',
                'apisecret':'3dc5032451bc446cbc574aec25d01247',
                'content-type':'application/json',
                'accept-language':'en',
                'resourceOwnerId':'00000023884901',
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
              } else {
                throw new Error('Response status is not as expected');
              }
            });  
          });
        });


        
    describe('Webview Test', () => {
    it('passed', () => {
        cy.log('Open Webview')
        cy.visit(`https://fatcaportal-uat.se.scb.co.th/aml/web?UserId=test&accept-language=th&code=${extractedUrl}&ekycMethod=1&referenceID=23123&userType=23&funcNm=223&service=123`);
        cy.wait(4000)
        cy.get('.btn-confirm').click()
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

         });
      });
    
})