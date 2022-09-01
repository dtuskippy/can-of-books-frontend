import React from 'react';
import axios from 'axios';
import {Carousel, Form, Button, Container, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      activeBook: {},
      show: false,
      showUpdateForm: false
    }
  }

  getBooks = async() => {
    try {
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      
      this.setState({
        books: bookData.data
      })

    } catch (error) {
      console.log('we have an error: ', error.response);
    }
  }

  handleBookCreate = async(bookInfo) => {
    console.log('You are inside of handleBookCreate')
    console.log(bookInfo);
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, bookInfo);
      const newBook = response.data;
      this.setState({
        books: [...this.state.books, newBook],
      });
    } catch (error) {
      console.log('error in book post: ', error.response);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleBookCreate({
      title: event.target.formTitle.value,
      description: event.target.formDescription.value,
      status: event.target.formStatus.checked
    })
    this.handleClose();
  }

  handleDelete = async (bookToDelete) => {
    try {
    
      const response = await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookToDelete._id}`);
      console.log(response.status);
      const filteredBooks = this.state.books.filter(book => {
        return book._id !== bookToDelete._id;
      })
      this.setState({
        books: filteredBooks
      })

    } catch (error) {
      console.log(error);
    }
  }

  updateBooks = async(bookToUpdate) => {
    console.log('updateBooks');
    console.log(bookToUpdate);
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`
      let updatedBook = await axios.put(url, bookToUpdate);
      
      let updatedBookArray = this.state.books.map(existingBook => {
        return existingBook._id === bookToUpdate._id
        ? updatedBook.data
        : existingBook
      });
      this.setState({books: updatedBookArray});
    } catch (error){
      console.log('error is book post: ', error.response);
      }
  }

  handleUpdateSubmit = (event) => {
    event.preventDefault();
    console.log('you are in handleUpdateSubmit');
    let bookToUpdate = {
      title: event.target.updateTitle.value || this.state.activeBook.title,
      description: event.target.updateDescription.value || this.state.activeBook.description,
      status: event.target.updateStatus.checked || this.state.activeBook.status,
      _id: this.state.activeBook._id,
      __v: this.state.activeBook.__v
    }

    this.updateBooks(bookToUpdate);
    this.handleUpdateClose();
  }

  handleUpdateClose = () => {
    this.setState({
      showUpdateForm: false
    })
  }

  handleClose = () => {
    this.setState({
       show: false
      })
  }

  handleShow = () => {
    this.setState({
       show: true
      })
  }
  
  componentDidMount() {
    this.getBooks();
  }

  render() {
    console.log(this.state.books);
  
    let carouselItems = this.state.books.map(book => (
      
      <Carousel.Item key={book._id}>
        <Carousel.Caption>
          <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>Have you ever read {book.title}?</h3>
          <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>Genre: {book.description}</h3>
          <Button key="updateForm" onClick={() => this.setState({ showUpdateForm: true, activeBook: book })}>Update Book</Button>
          <Button key="deleteBook" onClick={() => this.handleDelete(book)}>Remove from database?</Button>
        </Carousel.Caption>
        <img
          className="d-block w-100"
          src="https://dummyimage.com/100x100/07B862/07B862"
          alt="Placeholder"
        />
         
         
      </Carousel.Item>
    ))
     
        

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        
        {
          this.state.books.length > 0 ? (
          <Container>
            <Carousel>
              {carouselItems}
            </Carousel>
          </Container>
          ) : (
            <h3>No Books Found :</h3>
          )
        }
          
        <>
        <Button variant="primary" onClick={this.handleShow}> 
          Add a book!
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a book!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="name" placeholder="Enter book title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="name" placeholder="Enter a book description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStatus">
                <Form.Check type="checkbox" label="Is it in stock?" />
              </Form.Group>
              <Button variant="primary" type="submit">Submit!</Button>
          </Form>
         </Modal.Body>
        </Modal>
        </>


        {
          this.state.showUpdateForm && 
        <Container>
        <Form onSubmit={this.handleUpdateSubmit}>
          <Form.Group className="mb-3" controlId="updateTitle">
            <Form.Label>Update Title</Form.Label>
            <Form.Control type="text" placeholder={this.state.activeBook.title} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="updateDescription">
            <Form.Label>Update Description</Form.Label>
            <Form.Control type="text" placeholder={this.state.activeBook.description} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="updateStatus">
            <Form.Check type="checkbox" label="Status" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Container>
        }



      </>
    )
  }
}
     
export default BestBooks;
  

                
        


      
                    
