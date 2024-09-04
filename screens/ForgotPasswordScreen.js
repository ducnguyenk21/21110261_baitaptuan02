import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import OTPInputView from "react-native-otp-input";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    try {
      const response = await axios.post("https://yourapi.com/send-otp", {
        email,
      });
      if (response.data.success) {
        setOtpSent(true);
        Alert.alert("Success", "OTP sent to your email");
      } else {
        Alert.alert("Error", "Failed to send OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post("https://yourapi.com/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (response.data.success) {
        Alert.alert("Success", "Password reset successful!");
      } else {
        Alert.alert("Error", "Invalid OTP or something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View>
      {!otpSent ? (
        <>
          <Text>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
          />
          <Button title="Send OTP" onPress={handleSendOTP} />
        </>
      ) : (
        <>
          <Text>OTP:</Text>
          <OTPInputView
            pinCount={4}
            code={otp}
            onCodeChanged={setOtp}
            autoFocusOnLoad
            codeInputFieldStyle={{
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 5,
            }}
          />
          <Text>New Password:</Text>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            secureTextEntry
          />
          <Button title="Reset Password" onPress={handleResetPassword} />
        </>
      )}
    </View>
  );
}
