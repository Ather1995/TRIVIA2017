/*
test by zn
 */

let USERNAME
let PASSWORD = '123456'

describe('register page test', function () {

    var timestamp = Date.parse(new Date())
    console.log(timestamp)
    let REGISTER_USERNAME = '系统测试' + timestamp
    USERNAME = REGISTER_USERNAME
    let BAD_PASSWORD = '123'
    let REGISTER_PASSWORD = '123456'
    let REPEAT_PASSWORD = '1234567'
    let REGISTER_URL = 'http://localhost:63342/TriviaOnline_h5/html5/register.html'

    it('register page title is correct', function () {
        cy.visit(REGISTER_URL)
        cy.title().should('include', '用户注册')
    })

    context('before register input test', function () {
        beforeEach(function () {
            // Visiting our app before each test removes any state build up from
            // previous tests. Visiting acts as if we closed a tab and opened a fresh one
            // cy.visit(REGISTER_URL)
        })

        it('before register input exist', function () {
            cy.get('#username').should('have.class', 'username')
            cy.get('#password').should('have.class', 'password')
            cy.get('#password2').should('have.class', 'rePassword')
        })

        it('before register input empty', function () {
            cy.get('#username').should('have.value', '')
            cy.get('#password').should('have.value', '')
            cy.get('#password2').should('have.value', '')
        })

        it('before register button exist', function () {
            cy.get('#Register_button').should('exist')
            cy.get('#Register_button').should('have.text', '注册')
        })
    })

    context('new register', function () {
        beforeEach(function () {
            // Visiting our app before each test removes any state build up from
            // previous tests. Visiting acts as if we closed a tab and opened a fresh one
            // cy.visit(REGISTER_URL)
        })


        it('should allow me to type username and password', function () {
            cy.get('#username').type(REGISTER_USERNAME)
            cy.get('#username').should('have.value', REGISTER_USERNAME)
            cy.get('#password').type(REGISTER_PASSWORD)
            cy.get('#password').should('have.value', REGISTER_PASSWORD)
            cy.get('#password2').type(REGISTER_PASSWORD)
            cy.get('#password2').should('have.value', REGISTER_PASSWORD)

            cy.get('#username').clear()
            cy.get('#password').clear()
            cy.get('#password2').clear()
        })

        it('should hide error message before input', function () {
            cy.get('.errorText_password').should('have.attr', 'style', 'display: none;')
            cy.get('.errorText_repassword').should('have.attr', 'style', 'display: none;')
        });

        it('should show error message when password less than 6 cahracters', function () {
            cy.visit(REGISTER_URL)
            cy.get('#password').type(BAD_PASSWORD)
            cy.get('#password2').focus()
            cy.get('.errorText_password').should('have.attr', 'style', 'display: block;')

        });

        it('should show error message when rePassword is diff from password', function () {
            cy.get('#password').type(REGISTER_PASSWORD)
            cy.get('#password2').type(REPEAT_PASSWORD)
            cy.get('#password').focus()
            cy.get('.errorText_repassword').should('have.attr', 'style', 'display: block;')
            cy.get('#username').clear()
            cy.get('#password').clear()
            cy.get('#password2').clear()
        });

    })

    context('register success && upload login', function () {

        it('should register successfully', function () {
            // const stub = cy.stub()
            // cy.on('window:alert', stub)
            cy.get('#username').type(USERNAME)
            cy.get('#password').type(PASSWORD)
            cy.get('#password2').type(USERNAME)
            cy.get('#Register_button').click()
            //     .then(() => {
            //         expect(stub.getCall(0)).to.be.calledWith('登录成功！')
            //     })
            cy.location().should(function (location) {
                expect(location.hostname).to.eq('localhost')
                // expect(location.href).to.eq(REGISTER_URL)
                expect(location.pathname).to.eq('/TriviaOnline_h5/html5/login.html')
            })
        })
    })
})
