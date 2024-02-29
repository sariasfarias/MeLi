import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BasicForm } from './Form';


const formFunction = jest.fn();

describe('BasicForm ', () => {
    beforeEach(() => { jest.clearAllMocks()});
      
    it('render component when user wants to Sign up', async () => {
        
        render(
          <BasicForm 
              isRegisterUser={false} 
              formFunction={formFunction} 
              name={""} 
              lastName={""} 
              email={""} 
              password={""}
          />
        );
      
        const nameInput = screen.getByTestId('form-name');
        const lastNameInput = screen.getByTestId('form-lastname');
        const emailInput = screen.getByTestId('form-email');
        const passwordInput = screen.getByTestId('form-password');
        const submitButton = screen.getByText('Guardar');
      
        expect(nameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
    it('call the arg function when user wants to Sign up', async () => {
        
        render(
          <BasicForm 
              isRegisterUser={false} 
              formFunction={formFunction} 
              name={""} 
              lastName={""} 
              email={""} 
              password={""}
          />
        );
      
        const nameInput = screen.getByTestId('form-name');
        const lastNameInput = screen.getByTestId('form-lastname');
        const emailInput = screen.getByTestId('form-email');
        const passwordInput = screen.getByTestId('form-password');
        const submitButton = screen.getByText('Guardar');
      
        fireEvent.change(nameInput, { target: { value: 'Marcos' } });
        fireEvent.change(lastNameInput, { target: { value: 'Garcia' } });
        fireEvent.change(emailInput, { target: { value: 'marcos.garcia@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'qwerty123' } });
        
        fireEvent.click(submitButton);
      
        await waitFor(() => expect(formFunction).toHaveBeenCalledWith({
            name: 'Marcos',
            lastname: 'Garcia',
            email: 'marcos.garcia@example.com',
            password: 'qwerty123',
        }));
    });
    it('render component when user wants to LogIn', async () => {
        
        render(
          <BasicForm 
              formFunction={formFunction} 
              name={""} 
              lastName={""} 
              email={""} 
              password={""}
          />
        );
      
        const nameInput = screen.queryByTestId('form-name');
        const lastNameInput = screen.queryByTestId('form-lastname');
        const emailInput = screen.getByTestId('form-email');
        const passwordInput = screen.getByTestId('form-password');
        const submitButton = screen.getByText('Guardar');
      
        expect(nameInput).toBeNull();
        expect(lastNameInput).toBeNull();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
    it('call the arg function when user wants to LogIn', async () => {
        
        render(
          <BasicForm 
              formFunction={formFunction} 
              name={""} 
              lastName={""} 
              email={""} 
              password={""}
          />
        );
      
        const emailInput = screen.getByTestId('form-email');
        const passwordInput = screen.getByTestId('form-password');
        const submitButton = screen.getByText('Guardar');
      
        fireEvent.change(emailInput, { target: { value: 'marcos.garcia@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'qwerty123' } });
      
        fireEvent.click(submitButton);
      
        await waitFor(() => expect(formFunction).toHaveBeenCalledWith({
            email: 'marcos.garcia@example.com',
            password: 'qwerty123',
        }));
    });

});




