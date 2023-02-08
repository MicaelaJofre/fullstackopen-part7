import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from '../components/Blog'


describe('<Blog />', () => {

    const blog = {
        title: 'Test title',
        author: 'Mr. Test',
        url: 'www.test.com',
        likes: 5,
        user: {
            name: 'Test User',
            username: 'testuser',
            id: '5f9f1c5b9c9b9c0b1c8c1c5c'
        }
    }


    test('Blog component displays title and author, but not URL or number of likes by default', () => {

        const component = render(<Blog blog={blog} username={blog.user.username} />)

        // Verifica que el título se muestre
        expect(component.container).toHaveTextContent(blog.title)

        // Verifica que el autor se muestre
        expect(component.container).toHaveTextContent(blog.author)

        // Verifica que la URL y el número de likes no se muestren
        expect(component.container).not.toHaveTextContent(`Url: ${blog.url}`)

        expect(component.container).not.toHaveTextContent(`Likes: ${blog.likes}`)
    })

    test('render url and likes when view button is clicked', () => {

        const component = render(<Blog blog={blog} username={blog.user.username} />)

        const button = component.getByText('view')

        fireEvent.click(button)

        // Verifica que la URL y el número de likes se muestren al hacer click en el botón
        expect(component.container).toHaveTextContent(blog.url)
        expect(component.container).toHaveTextContent(blog.likes)
    })

    test('clicking the like button twice calls event handler twice', () => {

        const mockHandler = jest.fn()

        const component = render(<Blog blog={blog} username={blog.user.username} handleLikes={mockHandler} />)

        const button = component.getByText('view')
        fireEvent.click(button)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

    test('Remove the blog by clicking the remove button', () => {

        const mockHandler = jest.fn()

        const component = render(<Blog blog={blog} username={blog.user.username} handleDelete={mockHandler} />)

        const button = component.getByText('view')
        fireEvent.click(button)

        const removeButton = component.getByText('Remove')
        fireEvent.click(removeButton)

        expect(mockHandler.mock.calls).toHaveLength(1)
    })
})