"use client"

import React from "react";
import { useState } from "react";

const useInput = (initialValues:string) => {
  const maxWordCount:number = 300;
  const [value, setValue] = useState<string>(initialValues);
  const [email, setEmail] = useState<string>(initialValues);
  const [password, setPassword] = useState<string>(initialValues);
  const [confirmPassword, setConfirmPassword] = useState<string>(initialValues);
  const [selected, setSelected] = useState<string>(initialValues);
  const [errorMessage, setErrorMessage] = useState<string>(initialValues);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number>(0);
  const [dataIsValid, setDataIsValid] = useState<boolean>(false);



  const onValueChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const onEmailChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const onPasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const onConfirmPasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
  }

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
    setWordCount(event.target.value.length)
  }

  return {email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, value, setValue, isValid, setIsValid, isError, setIsError, errorMessage, setErrorMessage, onValueChange, onEmailChange, onPasswordChange, onConfirmPasswordChange, onTextAreaChange, dataIsValid, setDataIsValid, selected, setSelected, wordCount, maxWordCount}
}


export default useInput