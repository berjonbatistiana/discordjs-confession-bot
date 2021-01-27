const CHANNEL_FUNCTION_CODES = new Map();
const ROLE_FUNCTION_CODES = new Map();
CHANNEL_FUNCTION_CODES.set('confessions', 0);
CHANNEL_FUNCTION_CODES.set('confessions_public', 1);
ROLE_FUNCTION_CODES.set('confession_role', 0);

const MOD_ROLE = 'Lemon';

const PARTIALS = {
  partials: [
    'MESSAGE',
    'CHANNEL',
    'REACTION',
    'USER',
    'GUILD_MEMBER'
  ]
}

module.exports = {
  MOD_ROLE,
  PARTIALS,
  CHANNEL_FUNCTION_CODES,
  ROLE_FUNCTION_CODES,
}