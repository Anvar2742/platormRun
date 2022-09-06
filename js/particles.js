class Particle {
    constructor(game) {
        this.game = game
        this.markedForDeletion = false
    }

    update() {
        this.x -= this.speedX + this.game.speed
        this.y -= this.speedY
        this.size *= .97
        if (this.size < .5) this.markedForDeletion = true
    }
}

export class Dust extends Particle {
    constructor(game, x, y) {
        super(game)
        this.size = Math.random() * 5 + 5
        this.x = x
        this.y = y
        this.speedX = Math.random()
        this.speedY = Math.random()
        this.color = 'rgba(0, 0, 0, .7)'
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

export class Fire extends Particle {
    constructor(game, x, y) {
        super(game)
        this.image = document.getElementById('fire')
        this.size = Math.random() * 100 + 50
        this.x = x
        this.y = y
        this.speedX = 1
        this.speedY = 1
        this.angle = 0
        this.va = Math.random() * .8 - .4
    }

    update() {
        super.update()
        this.angle += this.va
        this.y += Math.sin(this.angle * .2)
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, -this.size * .5, -this.size * .5, this.size, this.size)
        ctx.restore()
    }
}