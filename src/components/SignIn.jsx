import React from 'react'
import Button from './forms/Button'
import { signInWithGoogle } from '../firbase/utils'

const SignIn = () => {
  return (
    <div>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </div>
  )
}

export default SignIn