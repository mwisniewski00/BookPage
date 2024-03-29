import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { getAllAuthors } from "../../ducks/authors/selectors";
import { getAllBooks } from "../../ducks/books/selectors";
import { getAuthorList } from "../../ducks/authors/operations";
import { getBookList } from "../../ducks/books/operations";
import * as Yup from "yup";
import { useEffect } from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import categories from "./helpers/categories";
import { default as ReactSelect } from "react-select";
import SelectOption from "../SelectOption";
import {
  setBookRequestStatus,
  setAuthorRequestStatus,
} from "../../ducks/requestsStatus/actions";
import PropTypes from "prop-types";

const BookForm = (
  {
    initialValues,
    onSubmit,
    authors,
    books,
    authorRequestStatus,
    bookRequestStatus,
    getAuthorList,
    getBookList,
    setBookRequestStatus,
    setAuthorRequestStatus,
  },
  { t }
) => {
  useEffect(() => {
    !authorRequestStatus && getAuthorList() && setAuthorRequestStatus(true);
    !bookRequestStatus && getBookList() && setBookRequestStatus(true);
  }, [authors, books]);

  const authorsOptions = authors.map((author) => ({
    value: author.id,
    label: author.name,
  }));
  const categoriesOptions = categories.map((category) => ({
    value: category,
    label: t(category),
  }));

  const bookSchema = Yup.object().shape({
    title: Yup.mixed()
      .required(t("Book title is required!"))
      .notOneOf(
        books
          .map((book) => book.title)
          .filter((title) => title !== initialValues.title),
        "Book title must be unique"
      )
      .test(
        "length",
        t("Book title can contain maximally 40 characters!"),
        (value, context) => !value || value.length <= 40
      ),
    categories: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.mixed()
            .oneOf(categories, t("Categories must be chosen from the list!"))
            .required(),
        })
      )
      .min(1, t("At least one category must be chosen!")),
    publishDate: Yup.date()
      .max(new Date(), t("Book must be published now!"))
      .required(t("Publish date is required!")),
    image: Yup.string().matches(/^https?:\/\/.+\/.+$/, t("Image must be url")),
    numberOfPages: Yup.number()
      .min(1, t("Book must have at least one page!"))
      .required(t("Number of pages is required!")),
    description: Yup.string().max(
      1000,
      t("Description can contain maximally 1000 characters.")
    ),
    authorsIds: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.mixed()
            .oneOf(
              authors.map((author) => {
                return author.id;
              }),
              t("Authors must be chosen from the list!")
            )
            .required(),
        })
      )
      .min(1, t("At least one author must be chosen")),
  });

  const mapSubmitValues = (values) => {
    const { authorsIds, categories, ...rest } = values;
    return {
      ...rest,
      authorsIds: authorsIds.map((author) => author.value),
      categories: categories.map((category) => category.value),
    };
  };

  return (
    <div>
      {
        <Formik
          initialValues={initialValues}
          enableReinitilise={true}
          onSubmit={(values) => onSubmit(mapSubmitValues(values))}
          validationSchema={bookSchema}
        >
          <Form>
            <div className="mb-3">
              <BootstrapForm.Label htmlFor="name">
                {t("Title")}
              </BootstrapForm.Label>
              <Field name="title" className="form-control" id="title" />
              <ErrorMessage
                className="text-danger"
                name="title"
                component="div"
              />
            </div>
            <div className="mb-3">
              <BootstrapForm.Label htmlFor="publishDate">
                {t("Published")}
              </BootstrapForm.Label>
              <Field
                name="publishDate"
                type="date"
                className="form-control"
                id="publishDate"
              />
              <ErrorMessage
                className="text-danger"
                name="publishDate"
                component="div"
              />
            </div>
            <div className="mb-3">
              <BootstrapForm.Label htmlFor="authorsIds">
                {t("Authors")}
              </BootstrapForm.Label>
              <Field name="authorsIds" className="form-control" id="authorsIds">
                {({ field, form, meta }) => (
                  <ReactSelect
                    options={authorsOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{ Option: SelectOption }}
                    allowSelectAll={true}
                    onChange={(values) =>
                      form.setFieldValue("authorsIds", values)
                    }
                    value={field.value}
                  />
                )}
              </Field>
              <ErrorMessage
                className="text-danger"
                name="authorsIds"
                component="div"
              />
            </div>
            <div className="mb-3">
              <BootstrapForm.Label htmlFor="numberOfPages">
                {t("Number Of Pages")}
              </BootstrapForm.Label>
              <Field
                name="numberOfPages"
                type="number"
                className="form-control"
                id="numberOfPages"
              />
              <ErrorMessage
                className="text-danger"
                name="numberOfPages"
                component="div"
              />
            </div>
            <div className="mb-3">
              <BootstrapForm.Label htmlFor="categories">
                {t("Categories")}
              </BootstrapForm.Label>
              <Field name="categories" className="form-control" id="categories">
                {({ field, form, meta }) => (
                  <ReactSelect
                    options={categoriesOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{ Option: SelectOption }}
                    allowSelectAll={true}
                    onChange={(values) =>
                      form.setFieldValue("categories", values)
                    }
                    value={field.value}
                  />
                )}
              </Field>
              <ErrorMessage
                className="text-danger"
                name="categories"
                component="div"
              />
            </div>
            <div className="mb-3">
              <BootstrapForm.Label htmlFor="description">
                {t("Description")}
              </BootstrapForm.Label>
              <Field
                as="textarea"
                name="description"
                className="form-control"
                id="description"
              />
              <ErrorMessage
                className="text-danger"
                name="description"
                component="div"
              />
            </div>
            <div className="mb-3">
              <BootstrapForm.Label htmlFor="image">
                {t("Image")}
              </BootstrapForm.Label>
              <Field name="image" className="form-control" id="image" />
              <ErrorMessage
                className="text-danger"
                name="image"
                component="div"
              />
            </div>
            <Button variant="success" type="submit">
              {t("Submit")}
            </Button>
          </Form>
        </Formik>
      }
    </div>
  );
};

BookForm.contextTypes = {
  t: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  const { initialValues, onSubmit } = props;
  return {
    initialValues,
    onSubmit,
    authors: getAllAuthors(state),
    books: getAllBooks(state),
    authorRequestStatus: state.requestsStatus.hasAuthorRequestHappend,
    bookRequestStatus: state.requestsStatus.hasBookRequestHappend,
  };
};

const mapDispatchToProps = {
  getAuthorList,
  getBookList,
  setBookRequestStatus,
  setAuthorRequestStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
