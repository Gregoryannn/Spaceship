export class Enemy {
    constructor(container, enemyClass, speed, lives, explosionClass) {
        this.container = container
        this.enemyClass = enemyClass
        this.speed = speed
        this.explosionClass = explosionClass
        this.element = document.createElement('div')
        this.interval = null
        this.lives = lives
    }

    init() {
        this.#setEnemy()
        this.#updatePosition()
    }

    #setEnemy() {
        this.container.appendChild(this.element)
        this.element.classList.add(this.enemyClass)
        this.element.style.left = `${this.#randomPosition()}px`
        this.element.style.top = 0
    }

    #randomPosition() {
        return Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth))
    }

    #updatePosition() {
        this.interval = setInterval(() => this.#setNewPosition(), this.speed)
    }

    #setNewPosition() {
        this.element.style.top = `${this.element.offsetTop + 1}px`
    }

    hit() {
        this.lives--
        if (!this.lives) {
            this.explode()
        }
    }

    explode() {
        this.element.classList.remove(this.enemyClass)
        this.element.classList.add(this.explosionClass)
        clearInterval(this.interval)

        const animationTime = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--explosions-animation-time'), 10)

        setTimeout(() => this.element.remove(), animationTime)
    }
}