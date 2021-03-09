const { emailActionsEnum } = require('../constants');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    templateName: 'welcome',
    subject: ''
  },

  [emailActionsEnum.USER_BLOCKED]: {
    templateName: '',
    subject: ''
  },

  [emailActionsEnum.PASSWORD_CHANGED]: {
    templateName: '',
    subject: ''
  },
};
