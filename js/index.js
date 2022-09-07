import {Player} from './player.js'
import {InputHandler} from './input.js'
import {Background} from './background.js'
import {FlyingEnemy, GroundEnemy} from './enemies.js'
import {UI, Health, Energy} from './UI.js'

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
            this.lives = [new Health(this), new Health(this), new Health(this)]
            this.lifeX = 20
            this.lifeGap = 20
            this.energySize = 100
            this.energy = new Energy(this)
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
            })

            this.particles.forEach((particle, index) => {
                particle.update()
                
            })
            if (this.particles.length > this.maxParticle) {
                this.particles = this.particles.slice(0, this.maxParticle)
            }

            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime)
                
            })

            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
            this.particles = this.particles.filter(particle => !particle.markedForDeletion)
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion)

            this.lives.forEach((life, index) => {
                life.draw(ctx, this.lifeX)
                if (index > 0) this.lifeX = ((index + 1) * this.lifeGap) + (index) * 5
                else if(index === 0) this.lifeX = 20
            })

            

            // Energy
            if (this.player.currentState === this.player.states[4] && this.energySize > 0) {
                this.energySize -= 1
            } else {
                if (this.energySize >= 100) this.energySize = 100
                else if(this.player.currentState === this.player.states[1]) this.energySize += .5

                if (this.energySize <= 10 && this.player.onGround()) {
                    this.input.keys = this.input.keys.filter(key => {
                        key != 'Space'
                    })
                }
            }
            
            this.energy.draw(ctx, this.energySize)
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