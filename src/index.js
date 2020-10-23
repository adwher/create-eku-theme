#!/usr/bin/env node
const fs = require("fs-extra")
const print = require("./print")
const { join } = require("path")

const defaultName = "awesome-eku-theme"
const projectName = process.argv.slice(2)[0] || defaultName

const folderPath = join(process.cwd(), projectName)

function copyTemplate() {
    const templatePath = join(__dirname, "../template")

    print.info("Make project template")

    fs.copySync(templatePath, folderPath)
    print.done("Make theme template")
}

function changeThemeFilename() {
    const oldPath = join(folderPath, "theme.scss")
    const newPath = join(folderPath, projectName + ".scss")

    fs.renameSync(oldPath, newPath)
}

function makePackageFile() {
    const destinationPath = join(folderPath, "package.json")
    const json = {
        name: projectName,
        version: "1.0.0",
        description: "Awesome eku theme",
        script: {
            minify: "sass eku.scss css/eku.min.css --no-source-map -s compressed",
            build: "sass eku.scss css/eku.css -s expanded",
            watch: "npm run build -- --watch"
        },
        dependencies: {
            eku: "0.3.3"
        },
    }

    fs.writeJSONSync(destinationPath, json, { spaces: 2 })
}

function installDependencies() {
    const { spawn } = require("cross-spawn")

    print.info("Install dependencies")
    
    spawn.sync("npm", ["install"], { stdio: 'inherit', cwd: folderPath })
}

function createProject() {
    print.info("Eku theme")
    console.log("Welcome to the create-eku-theme initilizer, this make a entire Eku theme project from scratch for you, so enjoy and we hope you like.")

    copyTemplate()
    changeThemeFilename()
    makePackageFile()
    installDependencies()

    print.info("Well, all is done")
    console.log("Now you can go to the folder and use the next commands to start to build an awesome themes.\n")

    print.command("npm run watch", "be earing to sass files and make a build")
    print.command("npm run build", "build the project with source map")
    print.command("npm run minify", "make a minificated version without source map")
    console.log("\n")
}

createProject()
