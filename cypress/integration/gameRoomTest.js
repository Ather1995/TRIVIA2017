/*
test by zn
 */

describe('gameRoom page test', function () {

    let LOGIN_USERNAME = '系统测试'
    let LOGIN_PASSWORD = '123456'
    let GAMEROOM_URL = 'http://localhost:63342/TriviaOnline_h5/html5/gameRoom.html'
    let LOGIN_URL = 'http://localhost:63342/TriviaOnline_h5/html5/login.html'
    var timestamp = Date.parse(new Date())


    context('gameRoom page title is correct', function () {
        it('enter gameRoom success', function () {
            cy.visit(LOGIN_URL)
            cy.get('#username').type(LOGIN_USERNAME)
            cy.get('#password').type(LOGIN_PASSWORD)
            cy.get('#button_login').click()
            cy.wait(1000)

            cy.get('#createNewRoom').click()
            cy.get('#roomName').should('exist')
            cy.get('button#createRoomButton').should('exist')
            cy.get('#roomName').type(timestamp)
            cy.get('#createRoomButton').click()
            cy.location().should(function (location) {
                expect(location.pathname).to.eq('/TriviaOnline_h5/html5/gameRoom.html')
            })
        })

        it('title correct', function () {
            cy.title().should('include', '游戏房间')
            cy.wait(1000)
        })
    })

    context('start game',function () {
        it('should shuffle right', function () {
            cy.wait(1000)
            cy.get('.confirmButton').click()
            cy.get('.isReady').click()
        });
    })

})