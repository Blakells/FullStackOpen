describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Blake',
      username: 'blakells',
      password:'12345'
  }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login Form is shown', function() {
    cy.contains('login').click()
  })

  it('succeeds with correct credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('blakells')
    cy.get('#password').type('12345')
    cy.get('#login-button').click()

    cy.contains('Blake logged in')
  })

  it('fails with wrong creds', function() {
    cy.contains('login').click()
    cy.get('#username').type('blakells')
    cy.get('#password').type('123455')
    cy.get('#login-button').click()
    cy.get('html').should('not.contain', 'Blake logged in')
  })

  describe('only when logged in', function() {
    beforeEach(function() {
      cy.login({username: 'blakells', password: '12345'})
    })

    it('A blog can be created', function() {
      cy.createBlog({author:'author',title:"title", url:'url.com'})
    })
    describe('only when the user has blogs', function() {
      beforeEach(function() {
        cy.createBlog({author:'author1', title:'title1', url:'url1.com', upvotes: 1})
        cy.createBlog({author:'author2', title:'title2', url:'url2.com'})
        cy.createBlog({author:'author3', title:'title3', url:'url3.com', upvotes: 4})
      })

      it('a blog can be upvoted', function() {
        cy.contains('view').click()
        cy.get('.blog-likes:first').click()
      })

      it('a blog can be deleted', function() {
        cy.contains('view').click()
        cy.get('#delete-button').click()
        cy.contains('hide').click()
      })

      it('Blogs are ordered based on number of likes, in descending order (from most likes till least likes)', function () {
        cy.get('.blog-summary:first').contains('title3')
        cy.get('.blog-summary:last').contains('title2')
  })
})
})
})