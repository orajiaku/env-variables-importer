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

## Key options

| Key           | Description               | default  | required  |
| ------------- |:-------------------------:| --------:| ---------:|
| key           | This is the key that will be used to get the value from the process.env      |   N/A    | true |
| required      | This indicates that an error should be thrown if the value isn't found     |   false  | false |
| pattern       | This is used to verify that the value gotten is correct by matching it to the given pattern |   N/A   | false |
| name          | This can be used to override the key that will be returned with the value   |    N/A   | false |
