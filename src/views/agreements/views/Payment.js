import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// ## Checkout Form
import CheckoutForm from "./CheckoutForm";

export default function Payment() {
  const stripePromise = loadStripe(
    "pk_test_51MAMf4FxUrhzqIkEGKEGx8RYrA6njN2jtSpWnxkxVvfusAymEqm3zsxMxVetdkZgbLdMWmGj2k7FvnRrBOvR1rv500PCo0VFVY"
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
