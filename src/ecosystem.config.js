// PM2 Server configs
module.exports = [{
    script: 'index.js',
    name: 'app',
    exec_mode: 'cluster',
    instances: 2
}]