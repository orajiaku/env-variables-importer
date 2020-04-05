const assert = require('assert');
const importEnvVariables = require('..');

describe('module', function() {
    let currentEnv;

    beforeEach(() => {
        currentEnv = { ...process.env };
    })

    it('should import environment variable when string is given as key', function() {
        process.env = {
            game: 'gamer'
        }

        const importedVars  = importEnvVariables([ 'game' ]);

        assert.equal(process.env.game, importedVars.game);
    });

    it('should import environment variable when object is given as key', function() {
        process.env = {
            game: 'gamer'
        }

        const importedVars  = importEnvVariables([{
            key: 'game'
        }]);

        assert.equal(process.env.game, importedVars.game);
    });

    it('should throw error if required key does not exist', function() {
        let err;

        try {
            importEnvVariables([{
                key: 'gamer',
                required: true
            }]);
        } catch(e) {
            err = e;
        }

        assert.equal(!!err, true);
        assert.equal(err.message, 'ENV_IMPORTER: Some errors occurred while importing environment variables');
    });

    it('should throw error if value doesnt match pattern', function() {
        let err;

        process.env = {
            gamer: 'readMe'
        }

        try {
            importEnvVariables([{
                key: 'gamer',
                pattern: /read[a-z]e/g
            }]);
        } catch(e) {
            err = e;
        }

        assert.equal(!!err, true);
        assert.equal(err.message, 'ENV_IMPORTER: Some errors occurred while importing environment variables');
    });

    it('should get environment variable with different name', function() {
        process.env = {
            gamer: 'readMe'
        }

        const importedVar = importEnvVariables([{
            key: 'gamer',
            name: 'johnny'
        }]);

        assert.equal(process.env.gamer, importedVar.johnny)
    });

    afterEach(() => {
        process.env = currentEnv;
    })
});
