const {screen, render, cleanup, waitFor} = require('@testing-library/react');
const { userEvent } = require('@testing-library/user-event');
const { Login } = require('../components/login');
require('@testing-library/jest-dom');
const { jest } = require('@jest/globals');
const React = require('react');

describe('login component tests', () => {
    afterEach(() => {
        cleanup(); 
    })
    // success case  // api errors
    it('successful login & behaviour on API responses', async () => {
        global.fetch = jest.fn();
        global.fetch
            .mockReturnValueOnce({
            ok: true,
            json: jest.fn(() => Promise.resolve('invalid'))
        })
        .mockReturnValueOnce({
            ok: true,
            json: jest.fn(() => Promise.resolve('success'))
        });
        render(<Login language='en'/>);
        await userEvent.type(screen.getByTestId('email-input'), 'valid@gmail.com');
        await userEvent.type(screen.getByTestId('password-login'), 'sdkmfkdslmfkdsmflk@1B');
        await userEvent.click(screen.getByTestId('login-btn'));
        expect(screen.getByTestId('login-status').textContent).toEqual('Invalid Credentials');
        await userEvent.click(screen.getByTestId('login-btn'));
        expect(screen.getByTestId('login-status').textContent).toEqual('success');
    });
})