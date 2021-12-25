export class Configuration {
  /**
   * @type {Configuration | null}
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

  #cols = 5
  #rows = 5
  #width = 400
  #height = 400

  constructor() {
    if (!Configuration.#instance) {
      Configuration.#instance = this
    }

    return Configuration.#instance
  }

  get openSet() {
    return this.#openSet
  }

  get closedSet() {
    return this.#closedSet
  }

  get cols() {
    return this.#cols
  }

  get rows() {
    return this.#rows
  }

  get width() {
    return this.#width
  }

  get height() {
    return this.#height
  }
}
