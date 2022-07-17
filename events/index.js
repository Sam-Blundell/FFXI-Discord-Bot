import { default as guildMemberAdd } from './guildMemberAdd.js';
import { default as guildMemberUpdate } from './guildMemberUpdate.js';
import { default as interactionCreate } from './interactionCreate.js';
import { default as ready } from './ready.js';

const eventFiles = {
    guildMemberAdd,
    guildMemberUpdate,
    interactionCreate,
    ready,
};

export default eventFiles;
