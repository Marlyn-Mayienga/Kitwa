import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import "../css/Events/WrappedPayment.css";

const stripePromise = loadStripe(
	"pk_test_51O6ugFHIsqFuJF6GMuPCa6lrV4uT0CgL9ldQyJA65xgkTyUssPcysDEJvDDP1ifLnvYE8vIHlFDlMrTzq4k45iHb00cGAOviEu"
);

function WrappedPaymentForm() {
	return (
		<div className="pay-container">
			<h1 className="pay-header">Pay using card</h1>
			<div className="pay-form">
				<Elements stripe={stripePromise}>
					<PaymentForm />
				</Elements>
			</div>
		</div>
	);
}

export default WrappedPaymentForm;
