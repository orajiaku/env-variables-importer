# Environment Variables Importer

This module makes missing environment variable errors more obvious.

```
Sample code

const importedVars = importEnvVariables([
    'game',
    {
        key: 'gamer',
        required: true,
        pattern: /gamer/
    }
])
```
