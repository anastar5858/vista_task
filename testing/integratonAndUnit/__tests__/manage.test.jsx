const {screen, render, cleanup, waitFor, act} = require('@testing-library/react');
const { userEvent } = require('@testing-library/user-event');
const { ManageView } = require('../components/manageView');
require('@testing-library/jest-dom');
const { jest } = require('@jest/globals');
const React = require('react');

const records = require('./dummyData/request.json');
const owner = 'anas.tarrab58@gmail.com';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const responseObjectMaker = (status, response) => {
    return {
        ok: status,
        json: jest.fn(() => Promise.resolve(response))
    }
}

describe('register component tests', () => {
    afterEach(() => {
        cleanup(); 
        jest.resetAllMocks();
    })
    // animation change
    it('Animation Change', async () => {
        global.fetch = jest.fn();
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, records));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, records));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        await act(() => {
            render(<ManageView language='en'/>);
        });
        expect(screen.getByTestId('request-title').textContent).toEqual(records[0].title);
        expect(screen.getByTestId('cardContainer').firstChild.id).toEqual('ellipse-plain');
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, records));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        await userEvent.click(screen.getByTestId('fly-demo'));
        expect(screen.getByTestId('cardContainer').firstChild.id).toEqual('ellipse');
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, records));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        await userEvent.click(screen.getByTestId('rocket-demo'));
        expect(screen.getByTestId('cardContainer').firstChild.id).toEqual('ellipse-rocket');
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, records));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        await userEvent.click(screen.getByTestId('default-demo'));
        expect(screen.getByTestId('cardContainer').firstChild.id).toEqual('ellipse-plain');
    });
    //  navigation system
    it('Navigation System', async () => {
        global.fetch = jest.fn();
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, records));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, records));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        await act(() => {
            render(<ManageView language='en'/>);
        });
        expect(screen.getByTestId('request-title').textContent).toEqual(records[0].title);
        await userEvent.click(screen.getByTestId('prev-demo'));
        // same title as there is no previous
        expect(screen.getByTestId('request-title').textContent).toEqual(records[0].title);
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, records));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        await userEvent.click(screen.getByTestId('next-demo'));
        expect(screen.getByTestId('request-title').textContent).toEqual(records[1].title);
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, records));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        await userEvent.click(screen.getByTestId('prev-demo'));
        expect(screen.getByTestId('request-title').textContent).toEqual(records[0].title);
    })
    //  filtering system
    it('Filtering System', async () => {
        global.fetch = jest.fn();
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, records));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, records));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        await act(() => {
            render(<ManageView language='en'/>);
        });
        // by owner
        cleanup();
        const filterOwner = records.filter((record) => record.creator === owner)
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, filterOwner));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, true));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, filterOwner));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, true));
        await act(() => {
            render(<ManageView language='en'/>);
        });
        await userEvent.click(screen.getByTestId('mine-demo'));
        // same title as there is no previous
        expect(screen.getByTestId('creator-sign').textContent).toEqual(`Created By:${owner}`);
        expect(screen.getByTestId('delete-request-btn')).not.toBeUndefined();
        // by status
        cleanup()
        const status = 'pending';
        const filterStatus = records.filter((record) => record.status === status)
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, filterStatus));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, filterStatus));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, false));
        await act(() => {
            render(<ManageView language='en'/>);
        });
        await userEvent.click(screen.getByTestId('comp-check'));
        expect(screen.getByTestId('request-status').textContent).toEqual(status);
        expect(screen.getByTestId('request-title').textContent).not.toEqual(records[0].title);
        expect(document.getElementById('delete-request-btn')).toBeNull();
        await userEvent.click(screen.getByTestId('comp-check'));
    })
    //  enabling and disabling photo feature
    it('Photo Mode Feature', async () => {
        const filterOwner = records.filter((record) => record.creator === owner)
        global.fetch = jest.fn();
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, filterOwner));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, true));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, filterOwner));
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, true));
        await act(() => {
            render(<ManageView language='en'/>);
        });
        expect(screen.getByTestId('cardContainer').firstChild.style.background).toEqual('');
        // enable photo mode
        await userEvent.click(screen.getByTestId('photo-mode-demo'));
        expect(screen.getByTestId('photo-mode-demo').checked).toBeTruthy()
        expect(screen.getByTestId('cardContainer').firstChild.style.background).toEqual(expect.stringContaining('url('));
        // disable photo mode
        await userEvent.click(screen.getByTestId('photo-mode-demo'));
        expect(screen.getByTestId('photo-mode-demo').checked).toBeFalsy();
    })
    //  updating status feature
    it('Updating status', async () => {
        const filterOwner = records.filter((record) => record.creator === owner);
        global.fetch = jest.fn();
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, filterOwner))
        .mockReturnValueOnce(responseObjectMaker(true, true))
        .mockReturnValueOnce(responseObjectMaker(true, filterOwner));
        await act(() => {
            render(<ManageView language='en'/>);
        });
        expect(screen.getByTestId('request-status').textContent).toEqual('completed');
        expect(screen.getByTestId('request-title').textContent).toEqual(filterOwner[0].title);
        const afterUpdate = {...filterOwner};
        afterUpdate[0].status = 'pending'
        await userEvent.click(screen.getByTestId('pending-manage'));
        expect(screen.getByTestId('request-title').textContent).toEqual(filterOwner[0].title);
        expect(screen.getByTestId('request-status').textContent).toEqual('pending');
    })
    //  delete request feature
    it('Delete Request', async () => {
        const filterOwner = records.filter((record) => record.creator === owner);
        global.fetch = jest.fn();
        global.fetch.mockReturnValueOnce(responseObjectMaker(true, filterOwner))
        .mockReturnValueOnce(responseObjectMaker(true, true))
        .mockReturnValueOnce(responseObjectMaker(true, 'success'))
        .mockReturnValueOnce(responseObjectMaker(true, filterOwner)); 
        await act(() => {
            render(<ManageView language='en'/>);
        });
        await userEvent.click(screen.getByTestId('delete-request-btn'));
        expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/api/delete-record", {"body": "{\"_id\":{\"$oid\":\"655bac4c98622c4f4197e0ac\"},\"title\":\"hello kitty\",\"__v\":0,\"creator\":\"anas.tarrab58@gmail.com\",\"date\":{\"$date\":\"2023-11-20T18:58:17.004Z\"},\"desc\":\"nice photo\",\"status\":\"pending\",\"picture\":\"https://wallpapercave.com/wp/3dyopJD.jpg\"}", "credentials": "include", "headers": {"content-type": "application/json"}, "method": "DELETE"});
        expect(screen.getByTestId('delete-request-btn').textContent).toEqual('deleted');
    })
})