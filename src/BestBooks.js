import React from 'react';
import axios from 'axios';
import {Carousel, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
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


  componentDidMount() {
    this.getBooks();
  }


  render() {
    console.log(this.state.books);

    let carouselItems = this.state.books.map(book => (
      <Carousel.Item key={book._id}>
        {/* <img
          className="d-block w-100"
          src={pic.src}
          alt={pic.alt}
        /> */}
        <Carousel.Caption>
          <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>Relax with this {book.title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ))

    // let renderedBooks = this.state.books.map(book => (
 
    //   <p key={book._id}>{book.title}</p>
    // ))

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {
          this.state.books.length > 0 &&
          <Container>
            <Carousel>
              {carouselItems}
            </Carousel>
          </Container>
        }

        {/* {
          this.state.books.length > 0 && 
          <>
            console.log("Gizmo is in the thingy jingys")
            {renderedBooks}
            
          </>
        
        } */}


        {/* {this.state.books.length ? (
          <p>{books}</p>
        ) : (
          <h3>No Books Found :</h3>
        )} */}
      </>
    )
  }
}

export default BestBooks;
