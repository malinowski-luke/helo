module.exports = {
  generateRandomImg: () => {
    return `https://robohash.org/${Math.random()
      .toString(36)
      .slice(2)}`
  }
}
