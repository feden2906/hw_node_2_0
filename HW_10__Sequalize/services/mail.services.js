const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD } = require('../configs/configs');
const { statusCodes, statusMessages } = require('../constants');
const templateInfo = require('../email-templates');
const { ErrorHandler } = require('../helpers');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templates')
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ROOT_EMAIL,
    pass: ROOT_EMAIL_PASSWORD
  }
});

const sendMail = async (userMail, action, context) => {
  const chosenTemplate = templateInfo[action];

  if (!chosenTemplate) {
    throw new ErrorHandler(statusMessages.WRONG_EMAIL_ACTION, statusCodes.BAD_REQUEST);
  }

  const html = await templateParser.render(chosenTemplate.templateName, context);

  return transporter.sendMail({
    from: 'No reply',
    to: userMail,
    subject: chosenTemplate.subject,
    html
  });
};

module.exports = {
  sendMail
};
