export class UI {
    constructor(game) {
        this.game = game
        this.fontSize = 20
        this.fontFamily = 'Helvetica'
    }

    draw(ctx) {
        ctx.font = this.fontSize + 'px ' + this.fontFamily
        ctx.textAlign = 'left'
        ctx.fillStyle = this.game.fontColor
        // score
        ctx.fillText('Score ' + this.game.score, 20, 40)
    }
}

export class Health {
    constructor(game) {
        this.game = game
        this.image = document.getElementById('heart')
        this.size = 20
    }

    draw(ctx, heartX) {
        // console.log(heartX)
        ctx.drawImage(this.image, heartX, this.size * 2.3, this.size, this.size)
    }
}

export class Energy extends UI {
    constructor(game) {
        super(game)
        this.fontSize = 14
    }

    draw(ctx, energy) {
        ctx.font = this.fontSize + 'px ' + this.fontFamily
        ctx.textAlign = 'left'
        ctx.fillStyle = this.game.fontColor
        ctx.fillText('Energy: ', 20, 70 + this.fontSize)
        // Energy bar
        // console.log(energy)
        ctx.fillRect(20, 75 + this.fontSize, energy, 10)
    }
}