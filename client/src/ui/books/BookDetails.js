import { Row, Col, Card, ListGroup, Button, Modal } from "react-bootstrap";
import { getBookById } from "../../ducks/books/selectors";
import { getAuthorsByIds } from "../../ducks/authors/selectors";
import { getAuthorsByBook } from "../../ducks/authors/operations";
import { getOneBook, deleteBook } from "../../ducks/books/operations";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import ReviewAdd from "../Reviews/ReviewAdd";
import { getReviewsFromBook } from "../../ducks/reviews/selectors";
import { deleteReview } from "../../ducks/reviews/operations";
import "../stylesheets/starability.css";
import PropTypes from "prop-types";

const BookDetails = (
  {
    book,
    authors,
    getAuthorsByBook,
    id,
    getOneBook,
    deleteBook,
    reviews,
    deleteReview,
  },
  { t }
) => {
  const [showConfirmDeleteBook, setShowConfirmDeleteBook] = useState(false);
  const handleCloseDeleteBook = () => setShowConfirmDeleteBook(false);
  const handleShowDeleteBook = () => setShowConfirmDeleteBook(true);

  const [showConfirmAddReview, setShowConfirmAddReview] = useState(false);
  const handleCloseAddReview = () => setShowConfirmAddReview(false);
  const handleShowAddReview = () => setShowConfirmAddReview(true);

  const [showConfirmDeleteReview, setShowConfirmDeleteReview] = useState(false);
  const handleCloseDeleteReview = () => setShowConfirmDeleteReview(false);
  const handleShowDeleteReview = () => setShowConfirmDeleteReview(true);

  const history = useHistory();

  const handleDelete = (book) => {
    deleteBook(book);
    history.push("/");
  };

  useEffect(() => {
    if (!book) {
      getOneBook(id);
    }
    if (!authors.length) {
      getAuthorsByBook(id);
    }
  }, [book, authors]);

  const avgRating = reviews
    .filter((review) => review)
    .reduce((acc, curr, _, { length }) => acc + curr.rating / length, 0);

  return (
    <>
      {book ? (
        <Row>
          <Col md={{ span: 5 }}>
            <Card className="mb-3">
              <Card.Img variant="top" src={book.image} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.description || t("No description")}</Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Title>{t("Categories")}</Card.Title>
                <ListGroup variant="flush">
                  {book.categories.map((category, i) => (
                    <ListGroup.Item key={i}>{category}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {t("Published")}:{" "}
                  {new Date(book.publishDate).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item className="text-muted">
                  {t("Number Of Pages")}: {book.numberOfPages}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Link to={`/books/${book.id}/edit`} className="btn btn-info">
                  {t("Edit")}
                </Link>
                <Button
                  variant="danger"
                  className="mx-3"
                  onClick={handleShowDeleteBook}
                >
                  {t("Delete")}
                </Button>
                <Modal
                  show={showConfirmDeleteBook}
                  onHide={handleCloseDeleteBook}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{t("Delete")}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {t(
                      "Are you sure you want to permanently delete this book?"
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteBook}>
                      {t("Close")}
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(book)}>
                      {t("Delete")}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
              {authors ? (
                <Card.Body>
                  <Card.Title>
                    {authors.length > 1 ? t("Authors") : t("Author")}
                  </Card.Title>
                  <ListGroup variant="flush">
                    {authors.length !== 0 ? (
                      authors.map((author) => (
                        <ListGroup.Item key={author.id}>
                          <Link to={`/authors/${author.id}`}>
                            {author.name}
                          </Link>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <div>{t("No Authors")}</div>
                    )}
                  </ListGroup>
                </Card.Body>
              ) : null}
            </Card>
          </Col>
          <Col md={{ span: 7 }}>
            <h1>
              {t("Rating")}:{" "}
              {Math.round((avgRating + Number.EPSILON) * 100) / 100 ||
                t("No rates")}
            </h1>
            <Button
              variant="success"
              onClick={handleShowAddReview}
              className="mb-3"
            >
              {t("Add Review")}
            </Button>
            <ReviewAdd
              bookId={id}
              showConfirm={showConfirmAddReview}
              handleClose={handleCloseAddReview}
            />
            {reviews.map((review) =>
              review ? (
                <Card className="mb-3" key={review.id}>
                  <Card.Body>
                    <p
                      className="starability-result"
                      data-rating={review.rating}
                    >
                      Rated: {review.rating} stars
                    </p>
                    <Card.Text>{review.body}</Card.Text>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={handleShowDeleteReview}
                    >
                      {t("Delete")}
                    </Button>
                    <Modal
                      show={showConfirmDeleteReview}
                      onHide={handleCloseDeleteReview}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>{t("Delete")}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {t(
                          "Are you sure you want to permanently delete this review?"
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={handleCloseDeleteReview}
                        >
                          {t("Close")}
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => deleteReview(id, review.id)}
                        >
                          {t("Delete")}
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Card.Body>
                </Card>
              ) : null
            )}
          </Col>
        </Row>
      ) : null}
    </>
  );
};

BookDetails.contextTypes = {
  t: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const book = getBookById(state, id);
  return {
    book,
    authors: book ? getAuthorsByIds(state, book.authorsIds) : [],
    reviews: book ? getReviewsFromBook(state, book.id) : [],
    id,
  };
};

const mapDispatchToProps = {
  getOneBook,
  getAuthorsByBook,
  deleteBook,
  deleteReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
