import CartObj from "../objects/CartObj";

function createArticle() {
    return {
        id: 0,
        name: "T-Shirt",
        price: 19.99
    }
}

afterEach(() => {
    CartObj.cart.clear();
})

it('cart is empty', function () {
    expect(CartObj.cart.articles.length).toBe(0)
});

it('adds a article with quantity 1', function () {
    CartObj.cart.addArticle(createArticle())

    expect(CartObj.cart.articles.length).toBe(1)
    expect(CartObj.cart.articles[0].quantity).toBe(1)
});

it('same article increases quantity', function () {
    CartObj.cart.addArticle(createArticle())
    CartObj.cart.addArticle(createArticle())

    expect(CartObj.cart.articles.length).toBe(1)
    expect(CartObj.cart.articles[0].quantity).toBe(2)
});

it('total price', function () {
    CartObj.cart.addArticle(createArticle())
    CartObj.cart.addArticle(createArticle())

    expect(CartObj.cart.getTotalPrice()).toBe(39.98)
});

it('position price', function () {
    CartObj.cart.addArticle(createArticle())
    CartObj.cart.addArticle(createArticle())

    expect(CartObj.cart.articles[0].getPositionPrice()).toBe(39.98)
});

it('remove decrease quantity', function () {
    CartObj.cart.addArticle(createArticle())
    CartObj.cart.addArticle(createArticle())
    CartObj.cart.removeArticle(createArticle())

    expect(CartObj.cart.articles.length).toBe(1)
    expect(CartObj.cart.articles[0].quantity).toBe(1)
});
