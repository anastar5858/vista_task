const {screen, render, cleanup, waitFor, act} = require('@testing-library/react');
const { userEvent } = require('@testing-library/user-event');
const { CreateForm } = require('../components/createForm');
require('@testing-library/jest-dom');
const { jest } = require('@jest/globals');
const React = require('react');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('create a request component tests', () => {
    afterEach(() => {
        cleanup(); 
    })
    // validation tests
    it('validation, creatuin and api errors test', async () => {
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
        // empty inputs
        await act( async () => await render(<CreateForm language='en'/>));
        await userEvent.click(document.getElementById('request-btn-demo'));
        expect(document.getElementById('request-btn-demo').textContent).toEqual('Missing Input');
        await userEvent.type(await screen.getByTestId('request-title'), 'nice title');
        await userEvent.click(document.getElementById('request-btn-demo'));
        expect(document.getElementById('request-btn-demo').textContent).toEqual('Missing Input');
        await userEvent.type(screen.getByTestId('request-desc'), 'nice description');
        await delay(2000)
        await userEvent.click(document.getElementById('request-btn-demo'));
        expect(document.getElementById('request-btn-demo').textContent).toEqual('Missing Input');
        // api error occured
        await userEvent.click(screen.getByTestId('progress-demo'));
        await delay(2000)
        await userEvent.click(screen.getByTestId('request-btn-demo'));
        expect(document.getElementById('request-btn-demo').textContent).toEqual('Could not process. Check input ot try re-logging!');
        await delay(2000)
        await userEvent.click(screen.getByTestId('request-btn-demo'));
        expect(document.getElementById('request-btn-demo').textContent).toEqual('success');
    }, 50000)
})