const { emailActionsEnum } = require('../constants');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    templateName: 'welcome',
    subject: 'create new profile'
  },

  [emailActionsEnum.DELETE_ACCOUNT]: {
    templateName: 'delete-account',
    subject: 'your account was deleted'
  },

  [emailActionsEnum.CHANGE_INFO]: {
    templateName: 'update-account',
    subject: 'your account was updated'
  },
};
