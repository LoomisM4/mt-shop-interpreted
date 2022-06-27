export default class CartObj { // 1
    static cart = new CartObj() // 2
    articles = [] // 1

    addArticle(article) { // 1
        let savedArticle = this.articles.find(a => a.article.id === article.id) // 7

        if (savedArticle !== undefined) { // 2
            savedArticle.quantity++ // 2
        } else { // 1
            let a = new CartArticle(article, 1) // 2
            this.articles.push(a) // 2
        }
    }

    removeArticle(article) { // 1
        let savedArticle = this.articles.find(a => a.article.id === article.id) // 7

        if (savedArticle !== undefined && savedArticle.quantity > 0) { // 5
            savedArticle.quantity-- // 2
        }
    }

    clear() { // 1
        this.articles = [] // 2
    }

    getTotalPrice() { // 1
        return this.articles.reduce((sum, a) => sum + a.getPositionPrice(), 0.0) // 5
    }
}

class CartArticle { // 1
    constructor(article, quantity) { // 1
        this.article = article // 2
        this.quantity = quantity // 2
    }

    getPositionPrice() { // 1
        return this.article.price * this.quantity // 5
    }
}

// 57
