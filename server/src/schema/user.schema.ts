import { object, string } from 'yup';

export const createUserSchema = object({
  body: object({
    email: string().email('Invalid Email').required('Email is required'),
    firstname: string().required('First name is required'),
    lastname: string().required('Last name is required'),
    password: string()
      .required('Password is required')
      .test(
        'passwordStrength',
        'Password must be between 8 and 24 with at least 1 capital letter.',
        (pwd) => {
          const regex = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*+-]{8,24}$/;
          return !!(pwd && regex.test(pwd));
        },
      ),
    passwordConfirmation: string()
      .required('Password confirmation is required')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
  }),
});

export const updateUserSchema = object({
  body: object({
    email: string().email('Invalid Email'),
    firstname: string(),
    lastname: string(),
    password: string()
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.passwordConfirmation === value;
      })
      .test(
        'passwordStrength',
        'Password must be between 8 and 24 with at least 1 capital letter.',
        (pwd) => {
          const regex = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*+-]{8,24}$/;
          return !!(pwd && regex.test(pwd));
        },
      ),
    passwordConfirmation: string().test(
      'passwords-match',
      'Passwords must match',
      function (value) {
        return this.parent.password === value;
      },
    ),
  }),
});
