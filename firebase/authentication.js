import {PhoneAuthProvider, PhoneMultiFactorGenerator, RecaptchaVerifier, createUserWithEmailAndPassword, getAuth, getMultiFactorResolver, multiFactor, signInWithEmailAndPassword, signOut, TotpMultiFactorGenerator} from "firebase/auth";
import { auth } from "./config";
import { resolve } from "styled-jsx/css";

export async function signUpUser(email, password) {
    let response = null,
    error = null;

    try {
        response = await createUserWithEmailAndPassword(auth, email, password)
    } catch(e) {
        error = e;
    }

    console.log("RESPONSE: ", response);
    console.log("ERROR: ", error)

    return { response, error }
}

export async function signInUser (email, password) {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container-id', undefined, auth);
    
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("USER CRED: ", userCredential)
            // User is not enrolled with a second factor and is successfully
            // signed in.
            // ...
        })
        .catch((error) => {
            if (error.code == 'auth/multi-factor-auth-required') {
                const resolver = getMultiFactorResolver(auth, error);
                // Ask user which second factor to use.
                if (resolver.hints[selectedIndex].factorId ===
                    PhoneMultiFactorGenerator.FACTOR_ID) {
                    const phoneInfoOptions = {
                        multiFactorHint: resolver.hints[selectedIndex],
                        session: resolver.session
                    };
                    const phoneAuthProvider = new PhoneAuthProvider(auth);
                    // Send SMS verification code
                    return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
                        .then((verificationId) => {
                            // Ask user for the SMS verification code. Then:
                            const cred = PhoneAuthProvider.credential(
                                verificationId, verificationCode);
                            const multiFactorAssertion =
                                PhoneMultiFactorGenerator.assertion(cred);
                            // Complete sign-in.
                            return resolver.resolveSignIn(multiFactorAssertion)
                        })
                        .then((userCredential) => {
                            // User successfully signed in with the second factor phone number.
                            console.log("USER SUCCESSFULLY SIGNED IN ", userCredential)
                        });
                } else if (resolver.hints[selectedIndex].factorId === TotpMultiFactorGenerator.FACTOR_ID) {
                    // Handle TOTP MFA.
                    // ...
                } else {
                    // Unsupported second factor.
                }
            } else if (error.code == 'auth/wrong-password') {
                // Handle other errors such as wrong password.
            }
        });
}

export async function signOutUser() {
    const response = await signOut(auth);
    try {
        console.log("LOGOUT RESPONSE: ", response);
        return true;
    } catch(e) {
        console.log("LOGOUT ERROR: ", e);
        return false;
    }
}