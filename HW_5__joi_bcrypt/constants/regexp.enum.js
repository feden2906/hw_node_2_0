module.exports = {
  EMAIL_REGEXP: new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/),
  PHONE_REGEXP: new RegExp(/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/),
  PASSWORD_REGEXP: new RegExp(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/),
  MONGO_ID: new RegExp(/([a-z0-9]{24})/)
};
