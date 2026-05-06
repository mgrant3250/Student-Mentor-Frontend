import React, { useReducer } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

/* ---------- Initial State ---------- */
const initialState = {
  FirstName: '',
  LastName: '',
  StudentId: '',
  Email: '',
  PhoneNumber: '',
  CurrentJobTitle: '',
  Organization: '',
  ProfileImageUrl: '',
  GraduationTerm: '',
  WantsToMentor: false,
  GitHubLink: '',
  LinkedInLink: '',
  Password: ''
};

/* ---------- Reducer ---------- */
function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
}

function RegisterForm() {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();

  /* ---------- Handlers ---------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    dispatch({
      type: 'UPDATE_FIELD',
      field: name,
      value: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/users/register', formData);
      alert('Registered successfully!');
      dispatch({ type: 'RESET_FORM' });
      navigate('/login');
    } catch (err) {
      alert('Registration failed.');
      console.error(err);
    }
  };

  /* ---------- JSX ---------- */
  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Register
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="FirstName"
          value={formData.FirstName}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="First Name"
          onChange={handleChange}
          required
        />

        <input
          name="LastName"
          value={formData.LastName}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />

        <input
          name="StudentId"
          value={formData.StudentId}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Student ID"
          onChange={handleChange}
          required
        />

        <input
          name="Email"
          type="email"
          value={formData.Email}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="Password"
          type="password"
          value={formData.Password}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <input
          name="PhoneNumber"
          value={formData.PhoneNumber}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <input
          name="CurrentJobTitle"
          value={formData.CurrentJobTitle}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Current Job Title"
          onChange={handleChange}
        />

        <input
          name="Organization"
          value={formData.Organization}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Organization"
          onChange={handleChange}
        />

        <input
          name="ProfileImageUrl"
          type="url"
          value={formData.ProfileImageUrl}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Profile Image URL"
          onChange={handleChange}
        />

        <input
          name="GraduationTerm"
          value={formData.GraduationTerm}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Graduation (e.g. Spring 2025)"
          onChange={handleChange}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            name="WantsToMentor"
            checked={formData.WantsToMentor}
            onChange={handleChange}
            className="mr-2"
            id="mentor"
          />
          <label htmlFor="mentor">Willing to Mentor</label>
        </div>

        <input
          name="GitHubLink"
          type="url"
          value={formData.GitHubLink}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="GitHub Profile"
          onChange={handleChange}
        />

        <input
          name="LinkedInLink"
          type="url"
          value={formData.LinkedInLink}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="LinkedIn Profile"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
