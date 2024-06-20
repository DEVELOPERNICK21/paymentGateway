import axios from 'axios';
import React from 'react'
import { Button, Pressable, View , Text, Alert } from 'react-native'

import EasebuzzCheckout from 'react-native-easebuzz-kit';


const Payment = () => {

    const callPaymentGateway = async () => {
        try {
          const response = await axios.post(
            'http://192.168.1.63:8000/api/initiate-payment',
            {
            txnid: "txnid123222",
                amount: 67.0,
                productinfo: "Apple", // Example product info
                firstname: "Harsh",
                phone: "9284621343",
                email: "harshjarare123@gmail.com",
                surl: "https://www.google.com", // Example success URL
                furl: "https://www.google.com" // Example failure URL
            }
          );
          console.log("RESPONE FROM API", response?.data)
          console.log("RESPONE FROM API", EasebuzzCheckout)
          const accessKey = response.data.data;
          const options = {
            access_key: accessKey,
            pay_mode: 'production', // Set to 'production' for live transactions
          };
          EasebuzzCheckout.open(options)
            .then(async (data) => {
              console.log('Payment Response:', data);
              const paymentResponse = data.payment_response; // Extract payment response
              const paymentStatus = data.result; // Extract payment status
              // Save the entire payment response to the database
            //   try {
            //     await axios.post('https://www.ipaisa.co.in/api/save', {
            //       payment_response: paymentResponse,
            //       result: paymentStatus
            //     });
            //     // Navigate based on the result
            //     if (paymentStatus === 'payment_successfull') {
            //       navigation.navigate('PaymentSuccess', {mobileNumber, userName});
            //     } else if (paymentStatus === 'user_cancelled' || paymentStatus === 'error_noretry' || paymentStatus === 'payment_failed') {
            //       navigation.navigate('PaymentFail', {mobileNumber, userName});
            //     }
            //   } catch (dbError) {
            //     console.error('Error saving payment transaction:', dbError);
            //     Alert.alert(
            //       'Error',
            //       'An error occurred while saving the payment transaction.'
            //     );
            //   }
            })
            .catch((sdkError) => {
              console.error('SDK Error:', sdkError);
              Alert.alert(
                'Error',
                'An error occurred while processing payment. Please try again later.'
              );
            });
        } catch (error) {
          console.error('Error initiating payment:', error);
          Alert.alert(
            'Error',
            'An error occurred while initiating payment. Please try again later.',
          );
        }
      };






  return (
    <View>
    <Pressable onPress={callPaymentGateway}>
        <Text>Here</Text>
    </Pressable>
      
    </View>
  )
}

export default Payment
