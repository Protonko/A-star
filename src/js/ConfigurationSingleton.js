export class ConfigurationSingleton {
  /**
   * @type {ConfigurationSingleton | null}
   */
  static #instance

  /**
   * @type {Set<Spot>}
   */
  #openSet = new Set()

  /**
   * @type {Set<Spot>}
   */
  #closedSet = new Set()

  /**
   * @type {HTMLCanvasElement}
   */
  #canvas

  /**
   * @type {HTMLDivElement}
   */
  #findPathButton

  /**
   * @type {HTMLDivElement}
   */
  #resetButton

  /**
   * @type {Object}
   * @param {number} mouse.x
   * @param {number} mouse.y
   * @param {number} mouse.width
   * @param {number} mouse.height
   */
  #mouse

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context
  #cols = 25
  #rows = 25
  #width = 400
  #height = 400

  constructor() {
    if (!ConfigurationSingleton.#instance) {
      ConfigurationSingleton.#instance = this
    }

    this.#canvas = document.getElementById('canvas-area')
    this.#findPathButton = document.getElementById('find-path-button')
    this.#resetButton = document.getElementById('reset-button')
    this.#context = this.#canvas.getContext('2d')
    this.#canvas.width = this.#width
    this.#canvas.height = this.#height
    this.#mouse = {
      x: 0,
      y: 0,
      width: 0.01,
      height: 0.1,
    }

    this.#canvas.addEventListener('mousemove', (event) => {
      this.#mouse.x = event.x - this.#canvas.getBoundingClientRect().left
      this.#mouse.y = event.y - this.#canvas.getBoundingClientRect().top
    })

    return ConfigurationSingleton.#instance
  }

  /**
   * @returns {CanvasRenderingContext2D}
   */
  get context() {
    return this.#context
  }

  /**
   * @returns {Set<Spot>}
   */
  get openSet() {
    // Prevent add and delete
    return new Set([...this.#openSet])
  }

  /**
   * @returns {Set<Spot>}
   */
  get closedSet() {
    // Prevent add and delete
    return new Set([...this.#closedSet])
  }

  /**
   * @returns {number}
   */
  get cols() {
    return this.#cols
  }

  /**
   * @returns {number}
   */
  get rows() {
    return this.#rows
  }

  /**
   * @returns {number}
   */
  get width() {
    return this.#width
  }

  /**
   * @returns {number}
   */
  get height() {
    return this.#height
  }

  /**
   * @returns {Object} mouse
   */
  get mouse() {
    return this.#mouse
  }

  /**
   * @returns {HTMLCanvasElement}
   */
  get canvas() {
    return this.#canvas
  }

  /**
   * @returns {HTMLDivElement}
   */
  get findPathButton() {
    return this.#findPathButton
  }

  /**
   * @returns {HTMLDivElement}
   */
  get resetButton() {
    return this.#resetButton
  }

  /**
   * @param {Spot} spot
   */
  appendSpotToOpenSet(spot) {
    this.#openSet.add(spot)
  }

  /**
   * @param {Spot} spot
   */
  appendSpotToClosedSet(spot) {
    this.#closedSet.add(spot)
  }

  resetOpenSet() {
    this.#openSet = new Set()
  }

  resetClosedSet() {
    this.#closedSet = new Set()
  }

  /**
   * @param {Spot} spot
   */
  removeFromOpenSet(spot) {
    this.#openSet.delete(spot)
  }
}
