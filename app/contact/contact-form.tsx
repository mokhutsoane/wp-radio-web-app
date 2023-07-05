'use client';

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;


interface FormData {
  [key: string]: string;
}

const INITIAL_FORM_DATA: FormData = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  company: '',
  subject: '',
  message: '',
};

export default function FormPage() {
  const [recaptchaResponseToken, setRecaptchaResponseToken] = useState('');

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitError, setFormSubmitError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormData>({});
  const [message, setmessage] = React.useState('');

  const handleRecaptchaChange = (token: string | null) => {
  if (token) {
    setRecaptchaResponseToken(token);
  }
};
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: FormData = {};
    const requiredFields: (keyof FormData)[] = [
      'firstName',
      'lastName',
      'phoneNumber',
      'email',
      'message',
      'subject',
    ];

    requiredFields.forEach((field) => {
      if (formData[field].trim() === '') {
        validationErrors[field] = `This is required`;
      }
    });

    if (formData.email.trim() !== '' && !isValidEmail(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && recaptchaResponseToken) {
      // Get reCAPTCHA response token
      const jsonData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
        recaptchaResponseToken: recaptchaResponseToken,

      };

      try {
        setIsLoading(true);

        const response = await fetch('/home/api/formSend', {
          method: 'POST',
          body: JSON.stringify(jsonData ),
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
        });

        if (response.ok) {
          const data = await response.json();
          setFormSubmitted(true);
          setFormSubmitError(false);
          setFormData(INITIAL_FORM_DATA);
          setmessage(`${data.message} ${data.invalid_fields}`);
        } else {
          setFormSubmitError(true);
        }
      } catch (error) {
        console.error('An error occurred while submitting the form', error);
        setFormSubmitError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      {formSubmitted ? (
        <p>{message}!</p>
      ) : (
        <form onSubmit={handleSubmit} className="">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {Object.entries(formData).map(([name, value]) => (
              <div
                key={name}
                className={name === 'message' ? 'sm:col-span-2' : ''}
              >
                <label
                  htmlFor={name}
                  className="block text-sm font-semibold leading-6 text-gray-300"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </label>
                <div className="mt-2.5">
                  {name === 'message' ? (
                    <textarea
                      name={name}
                      id={name}
                      rows={6} // Increase the number of rows here
                      value={value}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 bg-black px-3.5 py-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <input
                      type="text"
                      name={name}
                      id={name}
                      autoComplete={name}
                      value={value}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 bg-black px-3.5 py-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6"
                    />
                  )}
                  {formErrors[name] && (
                    <p className="text-red-500">{formErrors[name]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <div>
              {formSubmitError && (
                <p>
                  Error occurred while submitting the form. Please try again.{message}
                </p>
              )}
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <div className='mb-3'>
               <ReCAPTCHA sitekey={`${RECAPTCHA_SITE_KEY}`} onChange={handleRecaptchaChange} />
                </div>

                  <button
                    type="submit"
                    className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
                  >
                    Send
                  </button>
                 
                </div>
                
              )}
            </div>

          </div>
        </form>
      )}
    </div>
  );
}
