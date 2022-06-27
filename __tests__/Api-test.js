import Api from "../util/Api";

it('loads spotlight', async function () {
    let response = await Api.spotlight()
    expect(response).toBe("TEST")
    let article = response._embedded.articles

    expect(article.size).toBe(3)
});
