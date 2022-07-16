module.exports = {
    name: 'ready',
    once: true,
    execute (client) {
        const { tag = 'bottagnotfound' } = client.user;
        console.log(`Ready! Logged in as ${tag}`);
    },
};
