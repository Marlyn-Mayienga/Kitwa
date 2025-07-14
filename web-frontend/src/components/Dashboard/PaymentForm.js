// PaymentForm.js
import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ address, id, quantity }) => {
	const CL_token = "Token" + " " + localStorage.getItem("token");
	const [clientSecret, setClientSecret] = useState("");
	const [loading, setLoading] = useState(false);
	const stripe = useStripe();
	const elements = useElements();
	const artfactID = localStorage.getItem("artifactID");

	const navigate = useNavigate();


	console.log("show me the token",CL_token);

	const loadPaymentIntent = async () => {
		try {
			// fetch the client secret from the backend
			const response = await fetch(
				"http://127.0.0.1:8000/api/v1/buy-artifact/",
				{
					method: "POST",
					headers: {
						Authorization: CL_token,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						delivery_address: "Kigali",
						items: [{ id: artfactID, quantity: 1 }],
					}),
				}
			);
			const responseData = await response.json();
			console.log("show me this response of buy", responseData);

			if (response.ok){
				if (response.status === 200) {
					// Assuming the server returns clientSecret in the expected format
					setClientSecret(responseData.data.clientSecret);
					console.log("show me secret key", responseData.data.clientSecret);
				} else {
					console.error("Failed to fetch client secret:", responseData.error);
					// Handle error case
				}
			}
		} catch (error) {
			console.error("Error fetching client secret:", error);
			// Handle error case
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Disable the submit button while loading
		if (loading) {
			return;
		}
		// show loading state
		setLoading(true);
		try {
			// check if clientSecret is available
			if (!clientSecret) {
				throw new Error("Client secret not available");
			}
			const { paymentIntent, error } = await stripe.confirmCardPayment(
				clientSecret,
				{
					payment_method: {
						card: elements.getElement(CardElement),
					},
				}
			);

			if (error) {
				swal({
					title:"Error",
					text: error.message,
					icon:"error",
					timer: 2000
				}
					)
				console.error("show me these errors", error.message);
			} else {
				// Payment success
				swal({
					title: "Success",
					text: "Payment has been completed, Thank you!!",
					icon: "success",
					timer: 2000,
				});
				console.log(paymentIntent);
				
				navigate("/orderlists");
			}
		} catch (error) {
			swal({
				title: "Error",
				text: "Unexpected error occurred: ",
				icon: "error",
				timer: 2000,
			});
			console.error("Unexpected error occurred: ", error);
		} finally {
			// Reset loading state after submission
			setLoading(false);
		}
	};

	// Load the payment intent on component mount
	useEffect(() => {
		loadPaymentIntent();
	}, [address, id, quantity, stripe, elements]);

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button type="submit" disabled={!stripe || loading} style={{border:"none", color:"white",borderRadius:"2px", backgroundColor:"#0F75BC", marginTop:"20px"}}>
				{loading ? "Processing..." : "Pay"}
			</button>
		</form>
	);
};

export default PaymentForm;
