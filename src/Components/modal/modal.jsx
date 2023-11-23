import { useState } from 'react';
import Modal from 'react-modal';

// Make sure to bind the modal to your app element (e.g., document.getElementById('root'))
Modal.setAppElement('#root');

const MyModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: ''
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formValues);
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Modal Title</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default MyModal;