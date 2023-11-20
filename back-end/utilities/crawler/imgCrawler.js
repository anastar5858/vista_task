const puppeteer =  require('puppeteer');
const { updateRecordImage } = require('../../database/model/updateRecords');

const backgroundFetch = async (title) => {
    const searchUrl = `https://www.google.com/search?q=${title}%20desktop%20wallpaper&sca_esv=583992719&hl=en-GB&tbm=isch&biw=1536&bih=695&ei=oGhbZf6sGI2ZkdUPkZ63eA&iflsig=AO6bgOgAAAAAZVt2sCt22ocyB_A_HZcJVfMKDKPL5Pyq&ved=0ahUKEwj-_OXJ4NKCAxWNTKQEHRHPDQ8Q4dUDCAc&uact=5&oq=bye&gs_lp=EgNpbWciAmhpMggQABiABBixAzIIEAAYgAQYsQMyBRAAGIAEMgsQABiABBixAxiDATIFEAAYgAQyCBAAGIAEGLEDMggQABiABBixAzIOEAAYgAQYigUYsQMYgwEyCBAAGIAEGLEDMggQABiABBixA0ilEFCcDVjdDnAAeACQAQCYAdkBoAGaA6oBBTAuMS4xuAEDyAEA-AEBigILZ3dzLXdpei1pbWeoAgA&/data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAdVBMVEUAAAD///+NjIxQT09jYmJMS0uIh4fS0dGqqqr29fV6eXmEg4O/vr79/Pz5+fnh4OAqKirZ2NixsLBVVFTx8PCTkpIzMjLJyMjn5uaamZkbGhppaGgiICDf3t6zs7OmpaVfXl1zcnJEQ0MxMDA+PDwYFhYRDg7IXakrAAAELklEQVR4nO3Y6XaiShiF4UJRRBBFGUWDmJzc/yWeqq+Y0t32SmKnI73e548UU6gdqEkpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO91WMVFcs5nxz91w3SWXkbFnS4v/tS9v9cudjpPd90oc13X5q1vtR8dmOtyetetH8Vu4wz8wx13mukb2Ov1xmp0YKHLs7se8lFsTUheXYeJbNxxp6W+fi5bnwtrHcdz5+gmdzzCFzOfiJ/J5jpy7nrQm2G91yxQSR1u73mGrzUb/ddfvV23O2uWTfbmxEvQnMzvPFhfh72LdVB1/UKgb2UP2bCqoNmpn2RNcBlK13UwfPnlUsX5vvh8Zb6aCav+cWdTSAtWVFLKoyi8RI602gf5WM8ne17qy3nes95OfHOK70d7CatO5VBuTls4/mapw9z4vvLM3k377znI3/EvqygyJy6uqro+V3+l3p9SmcetT2/2PfUNvvRpun5FWw7bX/u5ev15L0pFoy7VnNGWYtW3Wfozjbbt7qW5vukuOd/XWP49tpLFft2PskrZkUtApseXTJK4TSOW/WtlMy3q0rPhbQuTT1IktYRlrpD3rhqHpW3P8qOvP8lL5tnyNMK69q/H1o6Fjm0V7Uv3asMKddmk5OtIV/aVy7qvzHxwjfqhzXJK/ZvbM8dh6cHpyYR4sGGbjF78yYSl/hu+OidQ9sWybUpq6+zZF2HoC2x4q3a3bq5smG96Q+nTXm2eo7DS7r761dQDvEhOP0wnLC3I/SGtuA9B2UrosHw5SxfddncoA7QiLbW0sNn8YuhgbzAKS45XEtbJ6acMyZTC0rIglyZEKZ1b13sn0hrdCKvLV5gTfhHW5jdhzfs32PyFSYWlZWbi82JC6MaFiaRwI6zozrAWbcOm5GWeRliLYVyTS8NbdE2J1PV8Myzz7bzuOurDYamhpZpMmxUNCwKmuztJJ2XrfLGd2Y2w8qFts8O0j4ZV2M5RqXoqYZknju2MY+9IE2X6JttoJbY2N8JquqGDcu3gden8tOrw27DM/ZxZdpXeeAphHe3YPPFCT5ZqzGDTDBX8sin9No0bYUnORbmeeW3jY47riXDw3rBUN5yfSljjuU3flSd9Wd6wW2E9j1bCzKD0ZDfDd4fVpWUmBdMISx3OXY2joN2VO329lfRVG/NrKiu9Qff99WussV2gqKWwHa2UOjI5bFdK+8XBPiwVxL5/Tic1znpJw/jsrZrRnjL0wrJdo5m77sX8ZpVbSVPuum67pL6oQy+v591lh/ppP9Mznsp17bxHn6kPHvWFmb1eJqA7vfE8foC+9cNNT6GdvJfOv7JG/3XMyCSfre3U4bsf5tGNO8P1dz/Mwyu76aX/wKujj+OgO5J8RVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAh/wPWBUt9sQ3o/cAAAAASUVORK5CYII=#imgrc=HWgpqBg84IjNdM`;
    const browser = await puppeteer.launch({
        headless: true,
    });
    const imageSearchPage = await browser.newPage();
    await imageSearchPage.goto(searchUrl, {
        waitUntil: 'networkidle2',
    });
    const imgHref = await imageSearchPage.evaluate(async () => {
        // Traverse the DOM and return the value you need
        const random = Math.floor(Math.random() * 20);
        const element = document.querySelector(`#islrg > div > div:nth-child(${random}) > a`);
        if (element) await element.click();
        // > div:first-child > div:first-child c-wiz > div:nth-child(3) > div#islmp > div > span > div#islrg > div:first-child
        
        // Return the desired property or text content
        return element ? element.href : null;
      });
      await imageSearchPage.close();
      // phase tow getting the image src
      if (imgHref) {
        const mainImagePage = await browser.newPage();
        await mainImagePage.goto(imgHref, {
            waitUntil: 'networkidle2',
        });
        const client = await mainImagePage.target().createCDPSession();   
        // Enable network domain
        await client.send('Network.enable');
        // Enable the device emulation
        await client.send('Emulation.setDeviceMetricsOverride', {
            width: 360,
            height: 640,
            deviceScaleFactor: 2,
            mobile: true,
        }).then(async () => {
            setTimeout(async () => {
                const imageSourceUnEnc = await mainImagePage.evaluate( async () => {
                    const element = document.querySelector(`body > c-wiz > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > c-wiz > div > div > div > div:nth-child(2) > div > a > img `);
                    return element ? element.src : null;
                });
                // we can save the image in the database record here (communicate with model)
                console.log('imageSourceUnEnc', imageSourceUnEnc)
                await updateRecordImage(title, imageSourceUnEnc);
                await browser.close();
            }, 5000 * 2)
        });
      }
}

module.exports = {
    backgroundFetch,
}