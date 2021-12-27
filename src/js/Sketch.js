import {ConfigurationSingleton} from './ConfigurationSingleton'
import {COLORS, SPOT_TYPE} from './static';
import {Utils} from './utils';
import {Pathfinder} from './Pathfinder';
import {Grid} from './Grid';

export class Sketch {
  /**
   * @type {ConfigurationSingleton}
   */
  #configuration

  /**
   * @type {Grid}
   */
  #grid

  /**
   * @type {Pathfinder}
   */
  #pathfinder

  /**
   * @type {Array<Spot>}
   */
  #path

  constructor() {
    this.#configuration = new ConfigurationSingleton()
    this.#grid = new Grid()
    this.#pathfinder = new Pathfinder(this.#grid)
    this.#path = []

    this.#handleSelectEndpoints()

    this.#configuration.findPathButton.addEventListener('click', () => {
      if (!this.#pathfinder.searchIsOver) {
        this.#findShortestPathAndVisualize()
      }
    })

    this.#configuration.resetButton.addEventListener('click', () => {
      if (this.#pathfinder.searchIsOver) {
        this.reset()
      }
    })

    this.#animate()
  }

  reset() {
    this.#configuration.resetOpenSet()
    this.#configuration.resetClosedSet()
    this.#grid = new Grid()
    this.#pathfinder = new Pathfinder(this.#grid)
    this.#path = []
    this.#animate()
  }

  #handleSelectEndpoints() {
    let startNode
    let endNode

    this.#configuration.canvas.addEventListener('click', () => {
      spotLoop: for (let row of this.#grid.grid) {
        for (let spot of row) {
          const spotMouse = {
            x: spot.x * spot.width,
            y: spot.y * spot.height,
            width: spot.width - 1,
            height: spot.height - 1,
          }

          if (Utils.collision(spotMouse, this.#configuration.mouse) && spot.type !== SPOT_TYPE.WALL) {
            if (startNode === spot) {
              return
            }

            if (startNode && endNode) {
              startNode = spot
              endNode = undefined
              this.#grid.setStartSpot(spot)
            } else if (startNode) {
              endNode = spot
              this.#grid.setEndSpot(spot)
            } else {
              startNode = spot
              this.#grid.setStartSpot(spot)
            }

            break spotLoop
          }
        }
      }
    })
  }

  #findShortestPathAndVisualize() {
    this.#pathfinder.findShortestPath()
    this.#drawClosedNodes()
    this.#drawDiscoveredNodes()
    this.#drawResultPath()
  }

  #drawGrid() {
    for (let i = 0; i < this.#configuration.cols; i++) {
      for (let k = 0; k < this.#configuration.rows; k++) {
        this.#grid.grid[i][k].draw(COLORS.white)
      }
    }
  }

  #drawClosedNodes() {
    for (let spot of this.#configuration.closedSet.values()) {
      spot.draw(COLORS.wewak)
    }
  }

  #drawDiscoveredNodes() {
    for (let spot of this.#configuration.openSet.values()) {
      spot.draw(COLORS.magicMint)
    }
  }

  #drawResultPath() {
    if (!this.#pathfinder.spotWithLowestIndex) {
      console.error('currentSpot is undefined!');
      return
    }

    this.#path = []
    let spot = this.#pathfinder.spotWithLowestIndex
    this.#path.push(spot)

    while (spot.previous) {
      this.#path.push(spot.previous)
      spot = spot.previous
    }


    this.#configuration.context.beginPath()

    for (let i = 0; i < this.#path.length; i++) {
      this.#configuration.context.strokeStyle = COLORS.wildBlueYonder
      this.#configuration.context.lineWidth = 10
      this.#configuration.context.lineCap = 'round'
      if (i !== 0) {
        this.#configuration.context.moveTo(
          this.#path[i - 1].x * this.#path[i - 1].width + this.#path[i - 1].width / 2,
          this.#path[i - 1].y * this.#path[i - 1].height + this.#path[i - 1].height / 2,
        )
      }

      this.#configuration.context.lineTo(
        this.#path[i].x * this.#path[i].width + this.#path[i].width / 2,
       this.#path[i].y * this.#path[i].height + this.#path[i].height / 2
      )
      this.#configuration.context.stroke()
    }
    this.#configuration.context.closePath()
  }

  #animate = () => {
    this.#drawGrid()

    if (this.#pathfinder.searchIsStarted) {
      this.#findShortestPathAndVisualize()
    }

    if (!this.#pathfinder.searchIsOver) {
      requestAnimationFrame(this.#animate)
    }
  }
}
