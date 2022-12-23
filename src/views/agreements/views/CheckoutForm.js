import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// ** Reactstrap Imports
import { Row, Col, Button, Form } from "reactstrap";

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d"
      }
    },
    invalid: {
      fontFamily: "Arial, sans-serif",
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
  };

  return (
    <Form id="paymentFromform" onSubmit={handleSubmit}>
      <Row className="mt-4">
        <Col className="mt-1" xs={12}>
          <CardElement id="card-element" options={cardStyle} />
        </Col>
        <Col className="mt-1" xs={12}>
          <Button
            type="submit"
            className="me-1"
            color="primary"
            block
            disabled={!stripe || !elements}
          >
            Pay
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CheckoutForm;

// import React, { useState, useEffect } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// // Styles
// import "./styles.css";

// export default function CheckoutForm() {
//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState("");
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     window
//       .fetch("/create-payment-intent", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ items: [{ id: "xl-tshirt" }] })
//       })
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         setClientSecret(data.clientSecret);
//       });
//   }, []);

//   const cardStyle = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: "Arial, sans-serif",
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#32325d"
//         }
//       },
//       invalid: {
//         fontFamily: "Arial, sans-serif",
//         color: "#fa755a",
//         iconColor: "#fa755a"
//       }
//     }
//   };

//   const handleChange = async (event) => {
//     // Listen for changes in the CardElement
//     // and display any errors as the customer types their card details
//     setDisabled(event.empty);
//     setError(event.error ? event.error.message : "");
//   };

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     setProcessing(true);

//     const payload = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement)
//       }
//     });

//     if (payload.error) {
//       setError(`Payment failed ${payload.error.message}`);
//       setProcessing(false);
//     } else {
//       setError(null);
//       setProcessing(false);
//       setSucceeded(true);
//     }
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <CardElement
//         id="card-element"
//         options={cardStyle}
//         onChange={handleChange}
//       />
//       <button disabled={processing || disabled || succeeded} id="submit">
//         <span id="button-text">
//           {processing ? (
//             <div className="spinner" id="spinner"></div>
//           ) : (
//             "Pay now"
//           )}
//         </span>
//       </button>
//       {/* Show any error that happens when processing the payment */}
//       {error && (
//         <div className="card-error" role="alert">
//           {error}
//         </div>
//       )}
//       {/* Show a success message upon completion */}
//       <p className={succeeded ? "result-message" : "result-message hidden"}>
//         Payment succeeded, see the result in your
//         <a href={`https://dashboard.stripe.com/test/payments`}>
//           {" "}
//           Stripe dashboard.
//         </a>{" "}
//         Refresh the page to pay again.
//       </p>
//     </form>
//   );
// }
