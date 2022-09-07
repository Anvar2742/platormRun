export class InputHandler {
    constructor(game) {
        this.game = game
        this.keys = []
        window.addEventListener('keydown', e => {
            if (
                (
                    e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowRight" ||
                    e.key === "ArrowLeft"
                ) &&
                this.keys.indexOf(e.key) === -1
            ) {
                this.keys.push(e.key)
            } else if (e.key === "d") this.game.debug = !this.game.debug
            else if (
                e.code === 'Space' && 
                this.keys.indexOf(e.code) === -1 &&
                this.game.energySize > 10
            ) {
                this.keys.push(e.code)
            }
        })

        window.addEventListener('keyup', e => {
            if (
                e.key === "ArrowDown" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowRight" ||
                e.key === "ArrowLeft"
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1)

                if (e.code === 'Space') {
                    this.keys.splice(this.keys.indexOf(e.code), 1)
                }
            } else if (e.code === 'Space') {
                this.keys.splice(this.keys.indexOf(e.code), 1)
            }
        })
    }
}