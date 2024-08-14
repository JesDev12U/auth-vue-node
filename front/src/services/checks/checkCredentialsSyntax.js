const checkCredentialsSyntax = {
  checkEmail: (email) =>
    /^[a-zA-Z0-9]+[\w.-]*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,7}$/.test(email),
  checkPassword: (password) => password.length >= 6,
};

export default checkCredentialsSyntax;
