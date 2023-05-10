import React, { useEffect, useState } from "react";
import "./PaymentValidation.css";

const PaymentValidation = () => {
  const [cardNumber, setCardNumber] = useState("XXXXXXXXXXXXXXXX");
  const [cardNumberError, setCardNumberError] = useState(true);
  const [cardName, setCardName] = useState("HOLDER NAME");
  const [cardNameError, setCardNameError] = useState(true);
  const [expiryMonth, setExpiryMonth] = useState("MM");
  const [expiryMonthError, setExpiryMonthError] = useState(true);
  const [expiryYear, setExpiryYear] = useState("YYYY");
  const [expiryYearError, setExpiryYearError] = useState(true);
  const [cvv, setCvv] = useState("CVV");
  const [cvvError, setCvvError] = useState(true);
  const [formInValid, setFormInValid] = useState(true);

  const handleCardNumberChange = (event) => {
    const value = event.target.value;
    setCardNumber(value);
    if (value.length === 16) {
      setCardNumberError(false);
    } else {
      setCardNumberError(true);
    }
  };

  const handleCardNameChange = (event) => {
    const value = event.target.value;
    setCardName(value);
    if (/^[a-zA-Z ]+$/.test(value)) {
      setCardNameError(false);
    } else {
      setCardNameError(true);
    }
  };

  const handleExpiryMonthChange = (event) => {
    const value = event.target.value;
    setExpiryMonth(value);
    if (/^(0[1-9]|1[0-2])$/.test(value)) {
      setExpiryMonthError(false);
    } else {
      setExpiryMonthError(true);
    }
  };

  const handleExpiryYearChange = (event) => {
    const value = event.target.value;
    setExpiryYear(value);
    const year = parseInt(event.target.value);
    const currentYear = new Date().getFullYear();
    if (
      /^[0-9]{4}$/.test(event.target.value) &&
      year >= currentYear &&
      year <= currentYear + 3
    ) {
      setExpiryYearError(false);
    } else {
      setExpiryYearError(true);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value;
    setCvv(value);
    if (/^\d{3}$/.test(value)) {
      setCvvError(false);
    } else {
      setCvvError(true);
    }
  };

  useEffect(() => {
    if (
      cardNumberError ||
      cardNameError ||
      expiryMonthError ||
      expiryYearError ||
      cvvError
    ) {
      setFormInValid(true);
    } else {
      setFormInValid(false);
    }
  }, [
    cardNumberError,
    cardNameError,
    expiryMonthError,
    expiryYearError,
    cvvError,
  ]);

  const handleSubmit = () => {
    console.log("submit called");
  };

  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card">
          <h3 style={{ textAlign: "center" }}>Card Details</h3>
          <br />
          <div className="debit-card-body">
            <p className="debit-card-bank">Bank Name</p>
            <p className="debit-card-no">{cardNumber}</p>
            <br />
            <div
              style={{ height: "45px", backgroundColor: "black" }}
              className="debit-card-stripe"
            ></div>
            <p>
              <span className="debit-card-holder-name">{cardName}</span>
              <span className="debit-card-date">
                {expiryMonth}/{expiryYear}
              </span>
              <span className="debit-card-cvv">{cvv}</span>
            </p>
          </div>
        </div>
        <section>
          <div className="pa-50">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="layout-column mb-15">
                <input
                  placeholder="Card Number"
                  data-testid="cardNumberInput"
                  onChange={handleCardNumberChange}
                  type="text"
                />
                {cardNumberError && (
                  <p className="invalid-text" data-testid="numberInputError">
                    Invalid Card Number
                  </p>
                )}
              </div>
              <div className="layout-column mb-15">
                <input
                  placeholder="Name On Card"
                  data-testid="nameInput"
                  onChange={handleCardNameChange}
                  type="text"
                />
                {cardNameError && (
                  <p className="invalid-text" data-testid="nameInputError">
                    Invalid Card Name
                  </p>
                )}
              </div>
              <div className="flex justify-content-around align-items-center">
                <div className="layout-column mb-30">
                  <input
                    placeholder="Expiry Month"
                    data-testid="monthInput"
                    onChange={handleExpiryMonthChange}
                    type="number"
                  />
                  {expiryMonthError && (
                    <p className="invalid-text" data-testid="monthInputError">
                      Invalid Month
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input
                    placeholder="Expiry Year"
                    data-testid="yearInput"
                    onChange={handleExpiryYearChange}
                    type="number"
                  />
                  {expiryYearError && (
                    <p className="invalid-text" data-testid="yearInputError">
                      Invalid Year
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input
                    placeholder="CVV"
                    data-testid="cvvInput"
                    onChange={handleCvvChange}
                    type="number"
                  />
                  {cvvError && (
                    <p className="invalid-text" data-testid="cvvInputError">
                      Invalid CVV
                    </p>
                  )}
                </div>
              </div>
              <div className="layout-column mb-30">
                <button
                  type="submit"
                  className="mx-0"
                  data-testid="submitButton"
                  disabled={formInValid}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentValidation;
