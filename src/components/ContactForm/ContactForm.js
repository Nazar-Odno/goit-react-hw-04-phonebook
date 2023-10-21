import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

class ContactForm extends React.Component {

    state = {
        name: '',
        number: '',
    };

    handleChange = event => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value,
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({
            name: '',
            number: '',
        })
    };

    render() {
        return (
            <div className={css.ContactForm}>
                <form onSubmit={this.handleSubmit}>
                    <label className={css.ContactForm__label}>
                        Name
                        <input
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                            className={css.ContactForm__input}
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <label className={css.ContactForm__label}>
                        Phone
                        <input
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                            className={css.ContactForm__input}
                            value={this.state.number}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <button
                        type="submit"
                        className={css.ContactForm__button}
                    >
                        + Add contact
                    </button>
                </form>
            </div>
        )
    }
}

ContactForm.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
  };

export default ContactForm;