const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};
  // Bespoke "isEmpty" checks for 'undefined,null,empty et.al'
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, {
      min: 2,
      max: 40
    })) {
    errors.handle = 'Handle needs to be between 2 and 40 charactors';
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile Handle is required';
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }
  if (!isEmpty(data.website)) {
    if (!Valaditator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Valaditator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Valaditator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Valaditator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Valaditator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Valaditator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};