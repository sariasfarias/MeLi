import { Formik, Form, Field } from "formik";
import './Form.scss';
import { IBasicForm } from "../../types";

export const BasicForm = (props: IBasicForm) => {
    
    const onSubmit = ({name, lastName, email, password, formFunction} : IBasicForm) => {
        const user = props.isRegisterUser ? 
            {
                email: email,
                password: password,
            }:{
                name: name,
                lastname: lastName,
                email: email,
                password: password,
            };
        formFunction(user); 
    }
    
    return (
        <Formik initialValues={props} onSubmit={onSubmit}>
            <Form className="basic-form">
                { props.isRegisterUser ? null : (
                    <>
                        <label htmlFor="firstName" className="basic-form_label">Nombre </label>
                        <Field name="name" type="text" placeholder="Juan" className="basic-form_input" data-testid="form-name"/>

                        <label htmlFor="lastName" className="basic-form_label"> Apellido</label>
                        <Field name="lastName" type="text" placeholder="Paredes" className="basic-form_input" data-testid="form-lastname"/>
                    </>
                )}
                
                <label htmlFor="email" className="basic-form_label">Email</label>
                <Field name="email" type="text" placeholder="juan.paredes@mail.com" className="basic-form_input" data-testid="form-email"/>

                <label htmlFor="password" className="basic-form_label">Contraseña</label>
                <Field name="password" type="password" placeholder="12345678" className="basic-form_input" data-testid="form-password"/>

                <button type="submit" className="basic-form_button">Guardar</button>
                </Form>
        </Formik>
    );
}

BasicForm.defaultProps = {
    isRegisterUser: true,
} as Partial<IBasicForm>;