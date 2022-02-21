describe("Connects to Metamask", () => {
  const waitUntilConnected = () => {
    cy.waitUntil(() => {
      return cy.findByTestId("disconnect-wallet-button").should("exist");
    });
    // waiting for disconnect button is not enough in rare cases to be logged in
    cy.wait(2000);
  };

  before("Loads the index page", () => {
    cy.visit("/");
  });

  it(`acceptMetamaskAccess should accept connection request to metamask`, () => {
    cy.findByTestId("connect-wallet-button").click();

    cy.acceptMetamaskAccess().then((connected) => {
      expect(connected).to.be.true;
    });

    waitUntilConnected();
  });

  it("should display the balance and address", () => {
    cy.findByTestId("connected-account-balance").should(
      "contains.text",
      "Connected Account Balance (ETH):"
    );

    cy.findByTestId("connected-account-address").should(
      "contains.text",
      "Connected Account Address:"
    );
  });

  it("Should be able fake a disconnect to the connect account", () => {
    cy.findByTestId("disconnect-wallet-button").click();
    cy.findByTestId("connected-account-balance").should("not.exist");
    cy.findByTestId("connected-account-address").should("not.exist");
    cy.findByTestId("connect-wallet-button").should("exist");
  });
});

export {};
