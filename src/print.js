const chalk = require("chalk")

module.exports = {

    
    info(text) {
        console.log("\n" + chalk.black.bgWhite(` ${text} `), "\n")
    },

    done(text) {
        console.log(chalk.black.bgGreen(" DONE ") + " " + text)
    },

    fail(text) {
        console.log(chalk.black.bgRed(" FAIL ") + " " + text)
    },

    command(text, description) {
        console.log(chalk.gray(">") + " " + chalk.green(text) + " " + description)
    }
}