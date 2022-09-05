import {Player} from './player.js'
import {InputHandler} from './input.js'
import {Background} from './background.js'
import {FlyingEnemy, GroundEnemy} from './enemies.js'
import {UI} from './UI.js'

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d')
    canvas.width = 500
    canvas.height = 500

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.groundMargin = 80
            this.speed = 0
            this.maxSpeed = 6
            this.player = new Player(this)
            this.input = new InputHandler(this)
            this.background = new Background(this)
            this.ui = new UI(this)
            this.enemies = []
            this.particles = []
            this.collisions = []
            this.maxParticle = 50
            this.enemyTimer = 0
            this.enemyInterval = 1000
            this.debug = false
            this.score = 0
            this.fontColor = 'black'
            this.player.currentState = this.player.states[0]
            this.player.currentState.enter()
        }

        update(deltaTime) {
            this.background.update()
            this.player.update(this.input.keys, deltaTime)
            //  Handle Enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy()
                this.enemyTimer = 0
            } else {
                this.enemyTimer += deltaTime
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime)
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
            })

            this.particles.forEach((particle, index) => {
                particle.update()
                if (particle.markedForDeletion) this.particles.splice(index, 1)
            })
            if (this.particles.length > this.maxParticle) {
                this.particles = this.particles.slice(0, this.maxParticle)
            }

            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime)
                if (collision.markedForDeletion) this.collisions.splice(index, 1)
            })
        }

        draw(ctx) {
            this.background.draw(ctx)
            this.player.draw(ctx)
            this.enemies.forEach(enemy => {
                enemy.draw(ctx)
            })
            this.particles.forEach(particle => {
                particle.draw(ctx)
            })
            this.collisions.forEach(collision => {
                collision.draw(ctx)
            })
            this.ui.draw(ctx)
        }

        addEnemy() {
            this.enemies.push(new FlyingEnemy(this))
            this.enemies.push(new GroundEnemy(this))
        }
    }

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.draw(ctx)
        game.update(deltaTime)

        requestAnimationFrame(animate)
    }
    animate(0)
})