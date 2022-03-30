export default class CartObj {
    static cart = new CartObj()
    articles = []

    addArticle(article) {
        let savedArticle = this.articles.find(a => a.article.id === article.id)

        if (savedArticle !== undefined) {
            savedArticle.quantity++
        } else {
            let a = new CartArticle(article, 1)
            this.articles.push(a)
        }
    }

    removeArticle(article) {
        let savedArticle = this.articles.find(a => a.article.id === article.id)

        if (savedArticle !== undefined && savedArticle.quantity > 0) {
            savedArticle.quantity--
        }
    }

    clear() {
        this.articles = []
    }

    getTotalPrice() {
        return this.articles.reduce((sum, a) => sum + a.getPositionPrice(), 0.0)
    }
}

class CartArticle {
    article
    quantity

    constructor(article, quantity) {
        this.article = article
        this.quantity = quantity
    }

    getPositionPrice() {
        return this.article.price * this.quantity
    }
}
