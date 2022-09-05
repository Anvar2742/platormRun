export class UI {
    constructor(game) {
        this.game = game
        this.fontSize = 30
        this.fontFamily = 'Helvetica'
    }

    draw(ctx) {
        ctx.font = this.fontSize + 'px' + this.fontFamily
        ctx.textAlign = 'left'
        ctx.fillStyle = this.game.fontColor
        // score
        ctx.fillText('Score ' + this.game.score, 20, 50)
    }
}