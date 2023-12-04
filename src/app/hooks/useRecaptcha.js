"use client"
import { RecaptchaVerifier } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";

export function useRecaptcha() {
    const [recaptcha, setRecaptcha] = useState();

    useEffect(() => {
        const recaptchaVerifier = new RecaptchaVerifier("sign-in-button", {
            "size": "invisible",
            "callback": function(response) {
                // reCAPTCHA solved, you can proceed with
                // phoneAuthProvider.verifyPhoneNumber(...).
                onSolvedRecaptcha();
            }
        }, auth);

        setRecaptcha(recaptchaVerifier);

        return () => {
            recaptchaVerifier.clear();
        }
    }, [componentId]);
}
