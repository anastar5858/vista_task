const {screen, render, cleanup, waitFor} = require('@testing-library/react');
const { userEvent } = require('@testing-library/user-event');
const { Register } = require('../components/register');
require('@testing-library/jest-dom');
const { jest } = require('@jest/globals');
const React = require('react');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


describe('register component tests', () => {
    afterEach(() => {
        cleanup(); 
    })
    // laguage change
    it('langugae change', () => {
        render(<Register language='en'/>);
        waitFor(() => {
            expect(screen.getByTestId('regsiter-btn')).toHaveTextContent('Register');
        });
        cleanup();
        render(<Register language='ar'/>);
        waitFor(() => {
            expect(screen.getByTestId('regsiter-btn')).toHaveTextContent('توكلنا على الله');
        });
    })
    // validation tests
    it('validation tests', async () => {
        // empty email
        render(<Register language='en'/>);
        await userEvent.click(screen.getByTestId('regsiter-btn'));
        expect(document.getElementById('register-input').placeholder).toEqual('Empty Email');
        // Invalid email
        await userEvent.type(screen.getByTestId('register-input'), 'invalid@.c');
        await userEvent.click(screen.getByTestId('regsiter-btn'));
        expect(document.getElementById('register-input').value).toEqual('Invalid Email');
        await delay(1000);
        expect(document.getElementById('register-input').value).toEqual('invalid@.c');
        // now move to check password rules (check boxes and animation)
        await userEvent.clear(screen.getByTestId('register-input'));
        await userEvent.type(screen.getByTestId('register-input'), 'valid@gmail.com');
        await userEvent.type(screen.getByTestId('password-input'), '1');
        expect(screen.getByTestId('pass-val-sten').checked).toBeFalsy();
        await userEvent.click(screen.getByTestId('regsiter-btn'));
        expect(document.getElementById('pass-val-sten').style.animation).toEqual('validationY 2s 1');
        // all checkboxes okay after correct password
        await userEvent.clear(screen.getByTestId('password-input'));
        await userEvent.type(screen.getByTestId('password-input'), 'sdkmfkdslmfkdsmflk@1B');
        expect(screen.getByTestId('pass-val-sten').checked).toBeTruthy();
        expect(screen.getByTestId('pass-val-long').checked).toBeTruthy();
        expect(screen.getByTestId('pass-val-limit').checked).toBeTruthy();
    })
    // success case  // api errors
    it('successful registration & behaviour on API responses', async () => {
        global.fetch = jest.fn();
        global.fetch
            .mockReturnValueOnce({
            ok: true,
            json: jest.fn(() => Promise.resolve('Invalid Email'))
        })
        .mockReturnValueOnce({
            ok: true,
            json: jest.fn(() => Promise.resolve({state: false, id: 'pass-val-sten'}))
        })
        .mockReturnValueOnce({
            ok: true,
            json: jest.fn(() => Promise.resolve('success'))
        });
        render(<Register language='ar'/>);
        await userEvent.type(screen.getByTestId('register-input'), 'valid@gmail.com');
        await userEvent.type(screen.getByTestId('password-input'), 'sdkmfkdslmfkdsmflk@1B');
        await userEvent.click(screen.getByTestId('regsiter-btn'));
        expect(document.getElementById('register-input').value).toEqual('إيميلك خطأ يالغالي');
        await delay(1000);
        await userEvent.click(screen.getByTestId('regsiter-btn'));
        expect(document.getElementById('pass-val-sten').style.animation).toEqual('validationY 2s 1');
        await userEvent.click(screen.getByTestId('regsiter-btn'));
        expect(document.getElementById('regsiter-btn').textContent).toEqual('تم');
    });
})