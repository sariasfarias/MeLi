import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BasicForm } from './Form';


const formFunction = jest.fn();

describe('BasicForm ', () => {
    beforeEach(() => { jest.clearAllMocks()});
      
    it('render component when there is not Register User', async () => {
        
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
      
        const nameInput = screen.getByPlaceholderText('Juan');
        const lastNameInput = screen.getByPlaceholderText('Paredes');
        const emailInput = screen.getByPlaceholderText('juan.paredes@mail.com');
        const passwordInput = screen.queryByPlaceholderText('12345678');
        const submitButton = screen.getByText('Guardar');
      
        expect(nameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
    it('call the arg function when there is not Register User', async () => {
        
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
      
        const nameInput = screen.getByPlaceholderText('Juan');
        const lastNameInput = screen.getByPlaceholderText('Paredes');
        const emailInput = screen.getByPlaceholderText('juan.paredes@mail.com');
        const passwordInput = screen.queryByPlaceholderText('12345678');
        const submitButton = screen.getByText('Guardar');
      
        fireEvent.change(nameInput, { target: { value: 'Marcos' } });
        fireEvent.change(lastNameInput, { target: { value: 'Garcia' } });
        fireEvent.change(emailInput, { target: { value: 'marcos.garcia@example.com' } });
        
        fireEvent.click(submitButton);
      
        await waitFor(() => expect(formFunction).toHaveBeenCalledWith({
            name: 'Marcos',
            lastName: 'Garcia',
            email: 'marcos.garcia@example.com',
            password: 'qwerty123',
        }));
    });
    it('render component when there is Register User', async () => {
        
        render(
          <BasicForm 
              formFunction={formFunction} 
              name={""} 
              lastName={""} 
              email={""} 
              password={""}
          />
        );
      
        const emailInput = screen.getByPlaceholderText('juan.paredes@mail.com');
        const passwordInput = screen.queryByPlaceholderText('12345678');
        const submitButton = screen.getByText('Guardar');
      
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
    it('call the arg function when there is Register User', async () => {
        
        render(
          <BasicForm 
              formFunction={formFunction} 
              name={""} 
              lastName={""} 
              email={""} 
              password={""}
          />
        );
      
        const emailInput = screen.getByPlaceholderText('juan.paredes@mail.com');
        const passwordInput = screen.queryByPlaceholderText('12345678');
        const submitButton = screen.getByText('Guardar');
      
        fireEvent.change(emailInput, { target: { value: 'marcos.garcia@example.com' } });
      
        fireEvent.click(submitButton);
      
        await waitFor(() => expect(formFunction).toHaveBeenCalledWith({
            name: '',
            lastName: '',
            email: 'marcos.garcia@example.com',
            password: 'qwerty123',
        }));
    });

});




