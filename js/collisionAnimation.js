export class CollisionAnimation { 
    constructor(game, x, y) {
        this.game = game
        this.image = document.getElementById('boom')
        this.spriteWidth = 100
        this.spriteHeight = 90
        this.sizeModifier = Math.random() + .5
        this.width = this.spriteWidth * this.sizeModifier
        this.height = this.spriteHeight * this.sizeModifier
        this.x = x - this.width * .5
        this.y = y - this.width * .5
        this.frameX = 0
        this.maxFrame = 4
        this.markedForDeletion = false
        this.fps = 20
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    update(deltaTime) {
        this.x -= this.game.speed
        //  Sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if (this.frameX < this.maxFrame) this.frameX++
            else this.markedForDeletion = true
        } else {
            this.frameTimer += deltaTime
        }
    }
}