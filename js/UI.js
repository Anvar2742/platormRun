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