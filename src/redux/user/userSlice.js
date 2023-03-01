import { createSlice } from "@reduxjs/toolkit";
// import { useDispatch, useDispatch } from "react-redux";

import { auth, handleUserProfile, GoogleProvider } from "../../firbase/utils";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    signInSuccess: false,
    signInError: [],
    signUpSuccess: false,
    signUpError: [],
  },

  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        state.user = null;
      } else {
        const { displayName, email, id, userRoles } = action.payload;
        state.user = {
          ...state.user,
          displayName: displayName,
          email: email,
          id: id,
          userRoles: userRoles,
        };
      }
    },
    signInSuccess: (state, action) => {
      state.signInSuccess = action.payload;
    },
    signInError: (state, action) => {
      state.signInError = action.payload;
    },
    signUpError: (state, action) => {
      state.signUpError = action.payload;
    },
    signUpSuccess: (state, action) => {
      state.signUpSuccess = action.payload;
    },
  },
});

export const { setUser, signInSuccess, signInError, signUpError, signUpSuccess } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectSignInSuccess = (state) => state.user.signInSuccess;
export const selectSignInError = (state) => state.user.signInError;
export const selectSignUpError = (state) => state.user.signUpError;
export const selectSignUpSuccess = (state) => state.user.signUpSuccess;

export const signInUser = (email, password) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch(signInSuccess(true));
    dispatch(signUpError([]))
  } catch (err) {
    dispatch(signInError([err.message]))
  }
};

export const signUpUser =
  (displayName, email, password, confirmPassword) => async (dispatch) => {
    if (password !== confirmPassword) {
      const error = ["Password does not mached"];
      dispatch(signUpError(error));
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });
      dispatch(signUpSuccess(true));
    } catch (err) {
      console.log(err);
    }
  };
export const signInWithGoogle = () => async dispatch => {
  try {
    await auth.signInWithPopup(GoogleProvider)
    .then(() => {
      dispatch(signInSuccess(true));
    })
  } catch (err) {
    console.log(err)
  }
  
}

export const logOut = () => async dispatch => {
  try {
    await auth.signOut()
    .then(() => {
      dispatch(signInSuccess(false));
      dispatch(signUpSuccess(false))
    })
      
    
  }
  catch (err) {
    console.log(err)
  }
}

export default userSlice.reducer;
