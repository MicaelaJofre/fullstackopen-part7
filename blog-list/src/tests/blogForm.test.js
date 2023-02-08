import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from '../components/BlogForm'


describe('<BlogForm />', () => {

    test('Verify that the form calls the event handler you received as attachments with the correct details when creating a new blog.', () => {

        const mockHandler = jest.fn()

        const component = render(<BlogForm createBlog={mockHandler} />)
        const form = component.container.querySelector('form')

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')

        fireEvent.change(title, {
            target: { value: 'Test title' }
        })
        fireEvent.change(author, {
            target: { value: 'Mr. Test' }
        })
        fireEvent.change(url, {
            target: { value: 'www.test.com' }
        })
        fireEvent.submit(form)

        expect(mockHandler.mock.calls[0][0].url).toBe('www.test.com')
        expect(mockHandler.mock.calls[0][0].title).toBe('Test title')
        expect(mockHandler.mock.calls[0][0].author).toBe('Mr. Test')
    })

})