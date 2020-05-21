describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Blake',
            username: 'blakells',
            password:'12345'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('blakells')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'blakells Logged In')
    })

    it('front page can be opened', function() {
        cy.contains('Notes')
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
    })

    it('user can login', function() {
        cy.contains('login').click()
        cy.get('#username').type('blakells')
        cy.get('#password').type('12345')
        cy.get('#login-button').click()
        cy.contains('blakells logged in')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({username: 'blakells', password: '12345'})
        })
    
        it('a new note can be created', function() {
          cy.contains('new note').click()
          cy.get('input').type('a note created by cypress')
          cy.contains('save').click()
          cy.contains('a note created by cypress')
        })

        describe('and a note exists', function() {
            beforeEach(function() {
                cy.createNote({ content: 'first note', important: false })
                cy.createNote({ content: 'second note', important: false })
                cy.createNote({ content: 'third note', important: false })
            })
            it('one of those can be made important', function() {
                cy.contains('second note').parent().find('button').as('theButton')
                cy.get('@theButton').click()
                cy.get('@theButton').should('contain', 'make not important')
            })
        })
      })
})