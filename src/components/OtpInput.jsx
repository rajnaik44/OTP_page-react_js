import React, { useRef, useState, useEffect } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRef = useRef([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    // Allow only numeric inputs
    if (!(/^\d*$/).test(value)) return;

    const newOtp = [...otp];
    // Allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //submit trigger
    const combineOtp = newOtp.join("");
    if(combineOtp.length === length)
    onOtpSubmit(combineOtp);


    //move to next if current field is filled
    if(value && index < length - 1 && inputRef.current[index + 1]){
      inputRef.current[index + 1].focus();
    }

  };

  //onclick it wil move cureser to end
  const handleClick = (index) => {
    inputRef.current[index].setSelectionRange(1 , 1)
  };

  //clear input on backspace 
  const handleKeyDown = (index , e) => {
    if(e.key === "Backspace" && !otp[index] && index > 0 && inputRef.current[index - 1]){
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <div>
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          ref={(input) => (inputRef.current[index] = input)}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="otpInput"
        />
      ))}
    </div>
  );
};

export default OtpInput;