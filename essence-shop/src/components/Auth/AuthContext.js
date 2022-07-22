import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState, useContext } from 'react';
import { auth } from '../../lib/init-firebase';
import React from 'react'
import { useEffect } from 'react';



export const login = async ({
    loginEmail, loginPassword
}) => {
    try {
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
};

export const register = async ({
    registerEmail,
    registerPassword
}) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }

};

export const logout = async () => {
    await signOut(auth);
}