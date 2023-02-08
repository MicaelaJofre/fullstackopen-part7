describe('Blog app', function () {

    const testUser = {
        name: 'Test User',
        username: 'username',
        password: 'password',
    }

    const testUserLogin = {
        username: 'username',
        password: 'password',
    }

    const testBlog = {
        title: 'TestBlog',
        author: 'TestAuthor',
        url: 'https://test.com',
        likes: 5,
    }

    const testBlog2 = {
        title: 'TestBlog2',
        author: 'TestAuthor2',
        url: 'https://test2.com',
        likes: 4,
    }



    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')

        cy.request('POST', 'http://localhost:3003/api/users', testUser)
    })

    it('login form can be opened', function () {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {

        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type(testUserLogin.username)
            cy.get('#password').type(testUserLogin.password)
            cy.get('#login-button').click()

            cy.contains('Test User logged in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type(testUserLogin.username)
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('Wrong username or password')
        })

        it('Error notification in red', function () {
            cy.contains('login').click()
            cy.get('#username').type(testUserLogin.username)
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })

    })

    describe.only('When logged in', function () {

        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/login', testUserLogin)
                .then(response => {
                    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
                    cy.visit('http://localhost:3000')
                })
        })

        it('A blog can be created', function () {
            cy.contains('Create a new blog').click()
            cy.get('#title').type(testBlog.title)
            cy.get('#author').type(testBlog.author)
            cy.get('#url').type(testBlog.url)
            cy.get('#create-button').click()

            cy.contains(`${testBlog.title} - Author: ${testBlog.author}`)
        })
        describe('and a blog exists', function () {

            beforeEach(function () {
                cy.request({
                    url: 'http://localhost:3003/api/blogs',
                    method: 'POST',
                    body: testBlog,
                    headers: {
                        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
                    }
                })
                cy.visit('http://localhost:3000')
            })

            it('A blog can be liked', function () {

                cy.contains(`${testBlog.title} - Author: ${testBlog.author}`)
                cy.contains('view').click()
                cy.contains('like').click()
                cy.contains(`${testBlog.title} - Author: ${testBlog.author}`).parent().contains(`Likes: ${testBlog.likes}`)
            })
            it('it can be deleted if the blogs belongs to the current user', function () {

                cy.contains(`${testBlog.title} - Author: ${testBlog.author}`)
                cy.contains('view').click()
                cy.contains('Remove').click()

                cy.get('html').should('not.contain', `${testBlog.title} - Author: ${testBlog.author}`)
            })
        })

        describe('and multiple blogs exist', function () {

            beforeEach(function () {
                cy.request({
                    url: 'http://localhost:3003/api/blogs',
                    method: 'POST',
                    body: testBlog,
                    headers: {
                        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
                    }
                })
                cy.request({
                    url: 'http://localhost:3003/api/blogs',
                    method: 'POST',
                    body: testBlog2,
                    headers: {
                        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
                    }
                })
                cy.visit('http://localhost:3000')
            })

            it('blogs are ordered by likes', function () {
                cy.get('.blog').then(blogs => {
                    cy.wrap(blogs[0]).contains(`${testBlog.title} - Author: ${testBlog.author}`)
                    cy.wrap(blogs[1]).contains(`${testBlog2.title} - Author: ${testBlog2.author}`)
                })
            })
        })
    })

})

