class Enemy {
    constructor() {
        this.frameX = 0
        this.frameY = 0
        this.fps = 20
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0
        this.markedForDeletion = false
    }

    update(deltaTime) {
        // this.y += this.speedY
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if (this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0
        } else {
            this.frameTimer += deltaTime
        }
        // Check if off screen
        if (this.x + this.width < 0) this.markedForDeletion = true
    }

    draw(ctx) {
        if (this.game.debug) ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super()
        this.game = game
        this.width = 60
        this.height = 44
        this.x = this.game.width
        this.y = Math.random() * this.game.height * .5
        this.speedX = Math.random() + 1
        this.speedY = 2
        this.maxFrame = 5
        this.image = document.getElementById('enemy1')
        this.angle = 0
        this.va = Math.random() * .1 + .1
    }

    update(deltaTime) {
        // movement
        this.x -= this.speedX + this.game.speed
        super.update(deltaTime)
        this.angle += this.va
        this.y += Math.sin(this.angle)
    }
}

// https://youtu.be/GFO_txvwK_c?t=30237
export class GroundEnemy extends Enemy {
    constructor(game) {
        super()
        this.game = game
        this.width = 60
        this.height = 44
        this.x = this.game.width
        this.y = this.game.height - this.game.groundMargin - this.width
        this.speedX = Math.random() + 1
        this.speedY = 2
        this.maxFrame = 5
        this.image = document.getElementById('enemy1')
    }

    update(deltaTime) {
        super.update(deltaTime)
        this.x -= this.game.speed * .8
    }
}

// class ClimbinbEnemy extends Enemy {

// }