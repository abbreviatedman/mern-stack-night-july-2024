const argon2 = require("argon2");

async function hashPassword(pass) {
  try {
    // 1-way send
    const sentReceipt = await argon2.hash(pass);
    return sentReceipt;
  } catch (error) {
    console.error("error hashing password: " + error);
  }
}

// console.log(hashPassword('fakePass123'))

// hashPassword('fakePass123')
//     .then((pass) => {
//         console.log(pass)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

async function getBackPassword(pass) {
  const returnedPass = await hashPassword(pass);
  console.log(returnedPass);
}

// getBackPassword('fakePass123')

async function verifyPassword() {
  try {
    let signUpPassword = "fakePass123";
    let encryptedSignUpPassword = await hashPassword(signUpPassword);
    let logInPassword = "fakePass123";

    console.log(`encrypted pass: ${encryptedSignUpPassword}`);
    console.log(`log in pass: ${logInPassword}`);
    // Verify the plain password against the hashed password
    const isMatch = await argon2.verify(encryptedSignUpPassword, logInPassword);
    return isMatch;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
}

// Call verifyPassword asynchronously
verifyPassword()
  .then((result) => {
    console.log(result); // Will log either true or false
  })
  .catch((error) => {
    console.error("Error:", error);
  });
