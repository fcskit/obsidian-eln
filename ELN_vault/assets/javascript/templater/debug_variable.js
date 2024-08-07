function debug_variable(variable, name) {

    console.log(`DEBUGGING information for variable: ${name}`)
    console.log(`   ${name} contains: ${variable}`)
    console.log(`   typeof ${name} returns: ${typeof variable}`)
    console.log(`   object ${name} is of class: ${variable.constructor.name}`)

    console.log(`   Stringified varibale ${name}: ${JSON.stringify(variable)}`)


    console.log(`   Is ${name} an array: ${Array.isArray(variable)}`)
    if (Array.isArray(variable)) {
        console.log(`   ${name} has ${variable.length} items`)
        console.log(`   First item of ${name} is: "${variable[0]}"`)
        console.log(`   typeof first item returns: ${typeof variable[0]}`)
    }
}

module.exports = debug_variable;