const formatMessage = message => `ENV_IMPORTER: ${message}`;

const throwError = message => {
    throw new Error(formatMessage(message));
};

const getVar = (env, key) => {
    if (!key) return {};

    if (typeof key === 'string') {
        if (!env[key]) return {};

        return {
            key,
            value: env[key]
        }
    }

    if (typeof key === 'object') {
        if (!key.key) return {}

        if (env[key.key]) {
            if (key.pattern && !key.pattern.test(env[key.key])) {
                throwError(
                    `Invalid environment variable found for '${key.key}'. Value doesn't match provided pattern`
                )
            }

            return {
                key: key.name || key.key,
                value: env[key.key]
            }
        } else if (key.required) {
            throwError(
                `'${key.key}' required but not found`
            )
        } else {
            return {};
        }
    }

}

const importer = (keys = []) => {
    let errors = '';
    const results = {};

    if (!Array.isArray(keys)) throwError('Keys should be an array');

    if (keys.length < 1) throwError('Keys required to import variables')

    keys.forEach(key => {
        try {
            const variable = getVar(process.env, key);

            if (variable.key) {
                results[variable.key] = variable.value;
            }
        } catch(e) {
            errors += `${e.message}\n`;
        }
    })

    if (errors.length > 0) {
        console.error(errors)

        throwError(
            'Some errors occurred while importing environment variables'
        )
    }

    return results;
}

module.exports = importer;