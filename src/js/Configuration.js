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
    // Prevent add and delete
    return new Set([...this.#openSet])
  }

  get closedSet() {
    // Prevent add and delete
    return new Set([...this.#closedSet])
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

  /**
   * @param {Spot} spot
   */
  removeFromOpenSet(spot) {
    this.#openSet.delete(spot)
  }

  /**
   * @param {Spot} spot
   */
  removeFromClosedSet(spot) {
    this.#closedSet.delete(spot)
  }
}
