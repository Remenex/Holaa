export const buttonActions = {
  test: () => console.log("Test successfull"),

  submitContactForm: (submitFromCallback: () => void) => submitFromCallback(),
  handleDialog: (handleDialogCallback: () => void) => handleDialogCallback(),
  redirect: (handleRedirectCallback: () => void) => handleRedirectCallback(),
  handleSubmit: (handleSubmitCallback: () => void) => handleSubmitCallback(),
  changePassword: (handleChangePasswordCallback: () => void) =>
    handleChangePasswordCallback(),
};
