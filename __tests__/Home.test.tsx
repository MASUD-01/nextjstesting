/* eslint-disable jest-dom/prefer-checked */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../src/app/page";

describe("Home", () => {
  it("should add a new todo", async () => {
    render(<Home />); // ARRANGE

    // ACT

    /* here labelText and placeholderText diye input ke dhora jay abong--The userEvent.type function is used here.
     It simulates a user typing the specified text ("My new todo") into the selected input element (input).
      The await keyword is used because this is an asynchronous operation, and it may take some time for the typing to complete.
       1 After simulating the typing, an assertion is made using the expect function. It checks that the value of the input element is now "My new todo."
       2 toHaveValue is an assertion matcher that checks the current value of an input element.
      
      */
    const input1 = screen.getByLabelText("New Todo");
    const input = screen.getByPlaceholderText("New Todo");
    await userEvent.type(input1, "My new todo");
    expect(input).toHaveValue("My new todo"); // ASSERT

    // ACT
    /* screen.getByRole: Selects an element based on its ARIA role. This is particularly useful for selecting elements that are semantically marked up with ARIA roles. */
    const button = screen.getByRole("button", {
      name: "Submit",
    });
    await userEvent.click(button);
    /* eikhane toHaveValue('') ensure kortase input e text likhar por seta button dara submit korar por
    input field e "" empty string ache kina */
    expect(input).toHaveValue(""); // ASSERT

    const data = await screen.findByText("My new todo");
    expect(data).toHaveTextContent("My new todo");
  });

  it("should update a todo", async () => {
    render(<Home />); // ARRANGE

    // ACT
    /* eikhane jotogula todo list hobe sobgular checkbox ache tai sobgula ke dhorse, ebong eta firstly false thakbe
     **jokhon user click korbe tokhon eta true hobe */
    const checkbox = screen.getAllByRole("checkbox")[0] as HTMLInputElement;
    expect(checkbox.checked).toBeFalsy();
    await userEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy(); // ASSERT
  });

  it("should delete a todo", async () => {
    render(<Home />); // ARRANGE

    const todoText = screen.queryByText("Write Code 💻");
    expect(todoText).toBeInTheDocument(); // ASSERT

    // ACT
    /*
    data-testid="delete-button" eta keno use kora hoise???
    ans: amra jani delete button onek gula hobe (jehetu list), button aro onek jaygay thakte pare, tai je button gula diye
    delete hobe segular akta name deya hoise, ebong sekhan theke index 0 number ke dhora hoise
    awai kore click kore check kora hoise eta document e exist ache ki na
    specific button ke dhorar jonne button data-testid="delete-button" use kora hoise
    
    
    */
    const button = screen.getAllByTestId("delete-button")[0];
    await userEvent.click(button);

    expect(todoText).not.toBeInTheDocument(); // ASSERT
  });
});
