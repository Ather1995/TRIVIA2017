/*
test by zn
 */

describe('gameLobby page test', function () {

    let LOGIN_USERNAME = 'tt4'
    let LOGIN_PASSWORD = '123456'
    let GAMELOBBY_URL = 'http://localhost:63342/TriviaOnline_h5/html5/gameLobby.html'
    let LOGIN_URL = 'http://localhost:63342/TriviaOnline_h5/html5/login.html'

    context('gameLobby page title is correct', function () {
        beforeEach(function () {

        })

        it('enter gameLobby success', function () {
            cy.visit(LOGIN_URL)
            cy.get('#username').type(LOGIN_USERNAME)
            cy.get('#password').type(LOGIN_PASSWORD)
            cy.get('#button_login').click()
            cy.location().should(function (location) {
                expect(location.pathname).to.eq('/TriviaOnline_h5/html5/gameLobby.html')
            })
        })

        it('title correct', function () {
            cy.title().should('include', '欢迎进入游戏大厅')
            cy.get('.cancel').click()
        })
    })

    context('page init correct', function () {
        // beforeEach(function () {
        //     cy.visit(LOGIN_URL)
        //     cy.get('#username').type(LOGIN_USERNAME)
        //     cy.get('#password').type(LOGIN_PASSWORD)
        //     cy.get('#button_login').click()
        // })

        it('should user info correct', function () {
            cy.get('.myscore').should('exist')
            cy.get('#myName').should('contain', LOGIN_USERNAME)
        })

        it('should allow logout', function () {
            cy.get('.cancel').should('exist')
        })

        it('should playlist contains current user', function () {
            cy.get('#playerList').should('contain', LOGIN_USERNAME)

            // setTimeout(() => {
            //     cy.get('#playerList').should('contain', LOGIN_USERNAME)
            // }, 5000)
        })
    })

    context('create new room', function () {
        beforeEach(function () {
            cy.visit(LOGIN_URL)
            cy.get('#username').type(LOGIN_USERNAME)
            cy.get('#password').type(LOGIN_PASSWORD)
            cy.get('#button_login').click()
        })

        it('should allow me to create new room', function () {
            cy.get('#createNewRoom').click()
            cy.get('#modal-default').should('exist')
            cy.get('#roomName').should('exist')
            var timestamp = Date.parse(new Date())
            cy.get('#roomName').type(timestamp)
            cy.get('#createRoomButton').click()
            cy.location().should(function (location) {
                // expect(location.href).to.eq('http://localhost:63342/TriviaOnline_h5/html5/gameLobby.html')
                expect(location.pathname).to.eq('/TriviaOnline_h5/html5/gameRoom.html')
            })
        })
    })
})