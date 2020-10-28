import * as React from 'react';
import { Genres } from '../../containers/genrelist/genre_list';
    
import { withFormik, FormikProps, Field } from 'formik';
import { FormMovie, MOVIE_VALIDATION_SCHEMA } from './common';
import styles from './form.module.scss';

interface AddMovieDialogProps {
    addMovie: (values: FormMovie) => void;
}

const INITIAL_FORM_VALUES = {
    title: '',
    release_date: '0000-00-00',
    poster_path: '',
    overview: '',
    runtime: 0,
    genres: [] as Genres[],
};

const AddMovieForm = (props: FormikProps<FormMovie>) => {
    const { touched, errors, handleSubmit, resetForm } = props;
    return (
    <form className={styles.form} onSubmit={handleSubmit}>                
        <div className={styles.field}>
            <span>TITLE</span>
            <Field name="title" placeholder="Title here" />                
            {errors.title && touched.title && (<div>{errors.title}</div>)}
        </div>
    
        <div className={styles.field}>
            <span>RELEASE DATE</span>
            <Field name="release_date" 
                type="date" 
                placeholder="Date here" /> 
            {errors.release_date && touched.release_date && (<div>{errors.release_date}</div>)}
        </div>
    
        <div className={styles.field}>
            <span>MOVIE URL</span>
            <Field name="poster_path" placeholder="Movie URL here" />
            {errors.poster_path && touched.poster_path && (<div>{errors.poster_path}</div>)}                
        </div>
    
        <div className={styles.field}>
            <span>GENRE</span>
            <Field name="genres" as="select" multiple 
                    placeholder="Genre here">
                <option value={Genres.ALL}>{Genres.ALL}</option>
                <option value={Genres.ADVENTURE}>{Genres.ADVENTURE}</option>
            </Field>
            {errors.genres && touched.genres && (<div>{errors.genres}</div>)}                
        </div>
    
        <div className={styles.field}>
            <span>OVERVIEW</span>
            <Field name="overview" type="text" placeholder="Overview here" />                
            {errors.overview && touched.overview && (<div>{errors.overview}</div>)}                
        </div>
    
        <div className={styles.field}>
            <span>RUNTIME</span>
            <Field name="runtime" type="number" placeholder="Runtime here"/>                
            {errors.runtime && touched.runtime && (<div>{errors.runtime}</div>)}                
        </div>
    
        <div className={styles.buttons}>
            <button type="button" className={styles.reset} onClick={() => resetForm()}>RESET</button>
            <button type="submit" className={styles.submit}>SUBMIT</button>
        </div>
    </form>);
};
    
const AddMovieFormik = withFormik<AddMovieDialogProps, FormMovie>({
    handleSubmit: (values, formikBag) => {
        formikBag.props.addMovie(values);
        formikBag.resetForm();
    },
    mapPropsToValues: () => (INITIAL_FORM_VALUES),
    enableReinitialize: true,
    validationSchema: MOVIE_VALIDATION_SCHEMA,validateOnChange: true
})(AddMovieForm);

export default AddMovieFormik;
